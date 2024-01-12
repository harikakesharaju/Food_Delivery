const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router=require('./routes/User')
const port = 5000;
const uri = 'mongodb://127.0.0.1:27017/gofood';

//mongodb://localhost:27017

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next();
})
app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello');
});

app.use("/api",router)
app.use('/api',require("./routes/Data"))
app.use("/api",require("./routes/Orders"))
// ... (previous code remains unchanged)

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('connected to mongo');
    
    try {
      const db = mongoose.connection.db;
      const collection = db.collection("food_data");
      const fetched = await collection.find({}).toArray();
      const foodcatd=await mongoose.connection.db.collection("food_cat")
      global.foodcat=await foodcatd.find({}).toArray();
      //console.log("here"); // line1
      global.fooditems = fetched;
      //console.log(global.foodcat);
      
      app.listen(port, function () {
        console.log(`running on port ${port}`);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })
  .catch((e) => {
    console.error('Could not connect to MongoDB:', e);
  });

// ... (remaining code remains unchanged)


