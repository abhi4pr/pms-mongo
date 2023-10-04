const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');
const vari = require('./variables.js');
const bodyParser = require('body-parser');

const app = express();
// app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use('/api', routes);

mongoose.connect(vari.MONGODB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  dbName:'instaDB'
}).then(()=>{
  console.log('DB connected');
})
.catch((err)=>{
  console.log(err);
})

app.listen(vari.PORT, ()=>{
  console.log('server is running at '+vari.API_URL);
});