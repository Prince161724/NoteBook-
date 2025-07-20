const connecttoMongo=require('./db');
const express=require('express');
var cors=require('cors');

connecttoMongo();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));


app.listen(5000, () => {
  //console.log("INoteBook backend at http://localhost:5000");
});
