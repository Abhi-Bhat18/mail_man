import { Injectable , Logger, OnModuleInit} from "@nestjs/common";

@Injectable()
import { Kysely } from 'kysely';


import {
  Contact,
  NewContact,
  ContactTable,
  ContactList,
  ContactListTable,
} from './types';
import { Database } from "../database/database.types";
import { DatabaseService } from "../database/database.service";
import { generateUlid } from "@/utils/generators";

@Injectable()
export class ContactService implements OnModuleInit {
  private readonly logger = new Logger(ContactService.name);

  private  db : Kysely<Database>
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  onModuleInit() {
      this.db = this.databaseService.getDb()
  };
  
  async processCSVUpload(
    filePath: string,
    contactListId: string,
    onProgress?: (progress: number) => void,
  ): Promise<{
    totalProcessed: number;
    successCount: number;
    errorCount: number;
  }> {
    const startTime = Date.now();
    let totalProcessed = 0;
    let successCount = 0;
    let errorCount = 0;
    
    try {
      // First, count total lines for progress calculation
      const totalLines = await this.countCSVLines(filePath) - 1; // Subtract header row
      
      const batchSize = 1000;
      let batch: NewContact[] = [];
      let lastProgressUpdate = 0;

      // Create a readable stream
      const fileStream = fs.createReadStream(filePath);

      const parser = csv.parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      const processStream = new Promise((resolve, reject) => {
        fileStream
          .pipe(parser)
          .on('data', async (record) => {
            try {
              const contact = this.createContactFromRecord(record, contactListId);
              batch.push(contact);
              totalProcessed++;

              if (batch.length >= batchSize) {
                parser.pause();
                await this.insertBatch(batch);
                successCount += batch.length;
                batch = [];
                parser.resume();
              }

              // Update progress every 5%
              const currentProgress = Math.floor((totalProcessed / totalLines) * 100);
              if (currentProgress > lastProgressUpdate + 5) {
                lastProgressUpdate = currentProgress;
                onProgress?.(currentProgress);
              }
            } catch (error) {
              this.logger.error(`Error processing record: ${error.message}`);
              errorCount++;
            }
          })
          .on('end', async () => {
            try {
              if (batch.length > 0) {
                await this.insertBatch(batch);
                successCount += batch.length;
              }
              resolve(true);
            } catch (error) {
              reject(error);
            }
          })
          .on('error', (error) => {
            reject(error);
          });
      });

      await processStream;

      await this.updateContactListCount(contactListId);

      const duration = Date.now() - startTime;

      this.logger.log(`CSV processing completed in ${duration}ms`);

      return {
        totalProcessed,
        successCount,
        errorCount,
      };

    } catch (error) {
      this.logger.error(`Failed to process CSV: ${error.message}`);

      throw error;
    } finally {
      // Cleanup: Delete the temporary file
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        this.logger.error(`Failed to delete temporary file: ${error.message}`);
      }
    }
  }

  private async countCSVLines(filePath: string): Promise<number> {
    return new Promise((resolve) => {
      let lineCount = 0;
      fs.createReadStream(filePath)
        .pipe(csv.parse())
        .on('data', () => lineCount++)
        .on('end', () => resolve(lineCount));
    });
  }

  private createContactFromRecord(record: any, contactListId: string): NewContact {
    if (!record.email) {
      throw new Error('Email is required');
    }

    return {
      id: generateUlid(),
      first_name: record.first_name || '',
      last_name: record.last_name || '',
      email: record.email.toLowerCase().trim(),
      contact: record.contact || '',
      attributes: this.parseAttributes(record),
      opt_in: true,
      unsubscribed: false,
      contact_list_id: contactListId,
    };
  }

  private async insertBatch(batch: NewContact[]): Promise<void> {
    await this.db.transaction().execute(async (trx) => {
      await trx
        .insertInto('contacts')
        .values(batch)
        .onConflict((oc) => 
          oc.column('email')
            .where('contact_list_id', '=', batch[0].contact_list_id)
            .doUpdateSet({
              first_name: (eb) => eb.ref('excluded.first_name'),
              last_name: (eb) => eb.ref('excluded.last_name'),
              contact: (eb) => eb.ref('excluded.contact'),
              attributes: (eb) => eb.ref('excluded.attributes'),
              updated_at: new Date().toISOString(),
            })
        )
        .execute();
    });
  }

  private parseAttributes(record: any): object {
    const attributes = {};
    const excludedFields = ['first_name', 'last_name', 'email', 'contact'];
    
    for (const [key, value] of Object.entries(record)) {
      if (!excludedFields.includes(key)) {
        attributes[key] = value;
      }
    }
    return attributes;
  }

  private async updateContactListCount(contactListId: string): Promise<void> {
    const count = await this.db
      .selectFrom('contacts')
      .where('contact_list_id', '=', contactListId)
      .count()
      .executeTakeFirst();

    await this.db
      .updateTable('contact_lists')
      .set({
        total_contacts: Number(count?.count ?? 0),
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', contactListId)
      .execute();
  }
}


interface CSVUploadDto {
  file: Express.Multer.File;
  contactListId: string;
}
