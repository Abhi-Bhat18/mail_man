import { faker } from '@faker-js/faker';
import { createObjectCsvWriter } from 'csv-writer';

// Define the CSV writer
const csvWriter = createObjectCsvWriter({
  path: 'contacts.csv',
  header: [
    { id: 'first_name', title: 'First Name' },
    { id: 'last_name', title: 'Last Name' },
    { id: 'email', title: 'Email' },
    { id: 'contact', title: 'Contact' },
    { id: 'attributes', title: 'Attributes' },
    { id: 'opt_in', title: 'Opt In' },
    { id: 'unsubscribed', title: 'Unsubscribed' },
    { id: 'updated_at', title: 'Updated At' },
    { id: 'created_at', title: 'Created At' },
  ],
});

// Function to generate random contact data
const generateContactData = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  contact: faker.phone.number(),
  attributes: JSON.stringify({
    interests: faker.word.noun(),
    notes: faker.lorem.sentence(),
  }), // JSON attributes
  opt_in: faker.datatype.boolean(),
  unsubscribed: faker.datatype.boolean(),
  updated_at: faker.date.recent().toISOString(),
  created_at: faker.date.past().toISOString(),
});

// Generate 200 rows of data
const contacts = Array.from({ length: 5 }, generateContactData);

// Write the data to CSV file
csvWriter
  .writeRecords(contacts)
  .then(() => console.log('CSV file created successfully at contacts.csv'))
  .catch((err) => console.error('Error writing CSV file', err));
