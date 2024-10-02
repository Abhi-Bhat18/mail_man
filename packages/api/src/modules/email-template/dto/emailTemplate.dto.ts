import {
  IsIn,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class emailTemplateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(4)
  description: string;

  @IsString()
  html: string;

  @IsObject()
  json: object;

  @IsIn(['draft', 'ready'])
  status: 'draft' | 'ready';

  @IsString()
  project_id: string;
}
