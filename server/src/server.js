import express from 'express';
import cors from 'cors';

const app = express();
const port = 9000; // default port to listen

const corsOptions = {
  origin: '*', /* todo: use actual url */
}

app.use(cors(corsOptions));

app.get('/v0/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('{"1": "Hallo"}');
});

app.listen(port, () => {
  console.log(`server listing on port ${port}`);
});
