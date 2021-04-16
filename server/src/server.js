import express from 'express';

const app = express();
const port = 9000; // default port to listen

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`server listing on port ${port}`);
});
