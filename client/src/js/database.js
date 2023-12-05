// Import openDB function from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    // Database upgrade function
    upgrade(db) {
      // Check if the object store 'jate' already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store 'jate' with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add data to the database
export const putDb = async (content) => {
  console.log("POST to the database");

  // Open the 'jate' database with version 1
  const textDb = await openDB("jate", 1);

  // Start a read-write transaction
  const tx = textDb.transaction("jate", "readwrite");

  // Access the 'jate' object store within the transaction
  const store = tx.objectStore("jate");

  // Put the provided content into the object store with a specific ID
  const request = store.put({ id: 1, value: content });

  // Wait for the put operation to complete and log the result
  const result = await request;
  console.log("Data saved to the database", result);
};

// Function to retrieve data from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Open the 'jate' database with version 1
  const textDb = await openDB("jate", 1);

  // Start a read-only transaction
  const tx = textDb.transaction("jate", "readonly");

  // Access the 'jate' object store within the transaction
  const store = tx.objectStore("jate");

  // Get the data from the object store with a specific ID
  const request = store.get(1);

  // Wait for the get operation to complete and log the result
  const result = await request;
  console.log("result.value", result);

  // Return the retrieved value, if any
  return result?.value;
};

// Call the initdb function to initialize the database
initdb();
