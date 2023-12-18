const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Returning the client file through the server
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

// Constant is used instead of an example to have clean code and improve processing speed
app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  if (!validateItem(newItem)) {
    return res.status(400).json({ message: 'Invalid input - some input fields may be missing' });
  }

  items = [...items, newItem]; // Immutably update the array
  res.status(201).json(newItem);
});

app.get('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

app.delete('/item/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  items = items.filter(item => item.id !== itemId);
  res.status(204).json(); // Returning a status
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
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
