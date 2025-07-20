const connecttoMongo=require('./db');
const express=require('express');
var cors=require('cors');

connecttoMongo();
const app=express();
app.use(cors({
  origin: '*', // ya specific 'http://localhost:3000'
  credentials: true
}));

app.use(express.json());

app.get('/check', (req, res) => {
  console.log("Someone hit /check route 🚀");
  res.send("Hello from backend!");
});
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));


app.listen(5000, () => {
  console.log("INoteBook backend at http://localhost:5000");
});
