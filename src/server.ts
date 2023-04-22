import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

app.post('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

app.put('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

app.delete('/', (req, res) => {
  console.log("body: ",req.body);
  console.log(" ");
  console.log("query: ",req.query);

  res.json("");
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
