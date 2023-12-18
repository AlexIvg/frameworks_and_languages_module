// Importing necessary modules
const express = require('express');
const cors = require('cors');

// Creating an instance of the Express application
const app = express();

// Setting the port for the server to listen on, using environment variable or defaulting to 8000
const port = process.env.PORT || 8000;

// Middleware to parse incoming JSON data and enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());
app.use(cors());

// Serving the client file when a GET request is made to the root path
app.get('/', (req, res) => {
  res.sendFile("client.html", { root: __dirname });
});


// Creating a constant to be returned
let items = [
  {
    "id": 0,
    "user_id": "user1234",
    "keywords": ["hammer", "nails", "tools"],
    "description": "A hammer and nails set",
    "image": "https://placekitten.com/200/300",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-12-13T13:17:42.334Z",
    "date_to": "2023-12-13T13:17:42.334Z"
  }
];

// Endpoint to retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Endpoint to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  
  // Validating the structure of the new item
  if (!validateItem(newItem)) {
    return res.status(400).json({ message: 'Invalid input - some input fields may be missing' });
  }

  // Adding the new item to the items array 
  items = [...items, newItem]; // Immutably update the array
  res.status(201).json(newItem);
});

// Endpoint to retrieve a specific item by ID
app.get('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = items.find(item => item.id === itemId);

  // Responding with a 404 status if the item is not found
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Responding with the found item
  res.json(item);
});

// Endpoint to delete a specific item by ID
app.delete('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  
  // Filtering out the item with the specified ID
  items = items.filter(item => item.id !== itemId);
  
  // Responding with a 204 status (No Content) to indicate successful deletion
  res.status(204).json();
});

// Setting up the server to listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Docker container exit handler (SIGINT signal) - exiting the process
process.on('SIGINT', function () {
  process.exit();
});

function validateItem(item) {
  // Your validation logic here
  // Return true if the item is valid, false otherwise
  return (
    item &&
    typeof item.id === 'number' &&
    typeof item.user_id === 'string' &&
    Array.isArray(item.keywords) &&
    typeof item.description === 'string' &&
    typeof item.image === 'string' &&
    typeof item.lat === 'number' &&
    typeof item.lon === 'number' &&
    typeof item.date_from === 'string' &&
    typeof item.date_to === 'string'
  );
}