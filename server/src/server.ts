import express from 'express';
import cors from 'cors';

const app = express();
const port = 9000; // default port to listen

const corsOptions = {
  origin: '*', /* todo: use actual url */
}

// TODO do not show server error details in response

app.use(cors(corsOptions));
app.use(express.json());

app.get('/v0/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('{"1": "Hallo"}');
});

// TODO sanitize
app.post('/v0/hello/:name', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(`{"1": "Hallo ${req.params.name} you sent ${req.body.message}"}`);
});

app.listen(port, () => {
  console.log(`server listing on port ${port}`);
});
