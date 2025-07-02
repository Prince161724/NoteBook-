const connecttoMongo=require('./db');
const express=require('express');
var cors=require('cors');

connecttoMongo();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

// app.get('/About',(req,res)=>{
//     res.send('So Route is a type of url which you sya that helps us to know at what url we will get what so like at /about page if the website we will egt the about info the website and like this at the contact page of teh webiste we will teh get the contact number of the webiste owner');
// })
// app.get('/Sign-Up',(req,res)=>{
//     res.send('So this is a page where yiu can sign up for the login page')
// })
// app.get('/Login',(req,res)=>{
//     res.send('So at thsi page you will have to fill teh login details of the user and You can login from here')
// })
app.listen(5000, () => {
  //console.log("INoteBook backend at http://localhost:5000");
});
