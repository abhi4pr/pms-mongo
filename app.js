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
const swaggerAccessManagement=require('./doc/customization_src/controller/swaggerAccessManagement.js');
const { checkDevAuthentication } = require("./doc/customization_src/middleware/swaggerMiddleware.js");
const path = require("path");
require("./controllers/autoMail.js");
require("./controllers/assetAutoMail.js");


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'doc/customization_src/doc_templates'));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }),
);
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api", routes);

// Code for  swagger in working stag

// Route for displaying the login form
app.get('/doc-login', (req, res) => {
  res.sendFile(__dirname + '/doc/customization_src/doc_templates/index.html');
});
app.get('/doc-access/:token',checkDevAuthentication, (req, res) => {
  return res.render('swaggerAccessForm');
});
app.get('/admin-profile', (req, res) => {
  return res.render('adminProfileOverview');
});
app.get('/admin-request', (req, res) => {
  return res.render('devRequestForm');
});
app.get('/all-request/:token',checkDevAuthentication, (req, res) => {
  return res.render('allDevRequest');
});
app.get('/dev-forgot', (req, res) => {
  return res.render('forgotPassword');
});
app.get('/otp-verify', (req, res) => {
  return res.render('otpVerify');
});
app.get('/reset-password', (req, res) => {
  return res.render('resetPassword');
});
app.get('/dev-delete/:id/:token/:page',checkDevAuthentication, (req, res) => {
  let userId  = req.params.id
  let token  = req.params.token
  let page  = req.params.page
  let url = page == 1 ? "/doc-user" : "/all-request"
  return res.render("confirmationTemplate", {
    error_title: "Are you sure you want to delete ?",
    error_description: "After delete this data you can't retrive from anyway....",
    error_image:
      "https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-9952946-8062130.png?f=webp",
      button_path_cancel: `${url}/${token}`,
      button_text_cancel: "Cancel",
      button_text_ok: "Ok",
      button_path_ok: `/delete-dev/${userId}/${token}/${page}`,
  });
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
app.post('/send-req',swaggerAccessManagement.addDevRequest );
app.post('/doc-logout/:token',checkDevAuthentication,swaggerAccessManagement.devLogout );
app.post('/add-developer/:token',checkDevAuthentication,swaggerAccessManagement.addDevData );
app.post('/verify-otp',swaggerAccessManagement.verifyOtp );
app.post('/otp-send',swaggerAccessManagement.otpSend );
app.post('/update-password',swaggerAccessManagement.updatePassword );
app.get('/doc-users/:token/:isAdminVerified',checkDevAuthentication,swaggerAccessManagement.getDevData );
app.get('/dev-login-history/:token',checkDevAuthentication,swaggerAccessManagement.getDevLoginHis );
app.get('/dev-data/:id/:token',checkDevAuthentication,swaggerAccessManagement.getDevSingleData );
app.put('/dev-data-update/:id/:token',checkDevAuthentication,swaggerAccessManagement.updateDevData );
app.get('/delete-dev/:id/:token/:page',checkDevAuthentication,swaggerAccessManagement.deleteDev );

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
