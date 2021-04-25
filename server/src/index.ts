import express from 'express';
import cors from 'cors';
import { connect, connection } from 'mongoose';
import apiRouter from './routes/api';
// import mockBooks from './mock/books';

const app = express();
const port = 9000; // default port to listen

const corsOptions = {
  origin: '*', /* todo: use actual url */
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiRouter)

app.get('/v0/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('{"1": "Hallo"}');
});

app.post('/v0/hello/:name', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(`{"1": "Hallo ${req.params.name} you sent ${req.body.message}"}`);
});

connect('mongodb://localhost:27017/books', {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = connection;
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => {
  const booksCollection = db.collection('books')
  booksCollection.estimatedDocumentCount(async (err, count) => {
      if (count) {
        console.log('mock data already exists');
        return;
      }
      const mockData = [{
        'isbn': '9780061808128',
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee'
      }];
      booksCollection.insertMany(mockData);
      console.log('inserted mock data');
  })
  app.listen(port, () => {
    console.log(`server listing on port ${port}`);
  })
})
