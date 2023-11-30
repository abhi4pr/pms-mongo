const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes.js");
const vari = require("./variables.js");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumantion = require("./doc/swaggerDoc.js");
const OpenAI = require("openai");
const { swaggerConfig } = require("./doc/swaggerConfig.js");
const errorController=require('./controllers/errorController.js')
const swaggerAccessManagement=require('./controllers/swaggerDocumentaion/swaggerAccessManagement.js');
const { checkDevAuthentication } = require("./middleware/swaggerMiddleware.js");
const path = require("path");
require("./controllers/autoMail.js");
require("./controllers/assetAutoMail.js");


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api", routes);

// Code for  swagger in working stag

// Route for displaying the login form
app.get('/doc-login', (req, res) => {
  res.sendFile(__dirname + '/uploads/assets/index.html');
});
app.get('/doc-access/:token',checkDevAuthentication, (req, res) => {
  return res.render('swaggerAccessForm');
});
app.get('/doc-user/:token',checkDevAuthentication, (req, res) => {
  return res.render('userList');
});
app.get('/login-history/:token',checkDevAuthentication, (req, res) => {
  return res.render('swaggerDevLoginHistory');
});
app.get('/dev-update/:id/:token',checkDevAuthentication, (req, res) => {
  return res.render('swaggerEditForm');
});
// Handle login
app.post('/doc-login',swaggerAccessManagement.devLogin );
app.post('/doc-logout/:token',checkDevAuthentication,swaggerAccessManagement.devLogout );
app.post('/add-developer/:token',checkDevAuthentication,swaggerAccessManagement.addDevData );
app.get('/doc-users/:token',checkDevAuthentication,swaggerAccessManagement.getDevData );
app.get('/dev-login-history/:token',checkDevAuthentication,swaggerAccessManagement.getDevLoginHis );
app.get('/dev-data/:id/:token',checkDevAuthentication,swaggerAccessManagement.getDevSingleData );
app.put('/dev-data-update/:id/:token',checkDevAuthentication,swaggerAccessManagement.updateDevData );
app.delete('/delete-dev/:id/:token',checkDevAuthentication,swaggerAccessManagement.deleteDev );

// end
app.use(
  "/api-docs/:token",
  checkDevAuthentication,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumantion, swaggerConfig)
);
// app.use(
//   "/api-docs/:token",
//   checkDevAuthentication,
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocumantion, swaggerConfig)
// );

const openai = new OpenAI({
  apiKey: "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",
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 4000,
  });
  res.status(200).send(completion.choices[0].text);
});

app.use(errorController)
// mongoose.set('debug', true);
mongoose
  .connect(vari.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "instaDB",
  })
  .then(() => {
    console.log(`DB connected : ${vari.MONGODB}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(vari.PORT, () => {
  console.log("server is running at " + vari.API_URL);
});
