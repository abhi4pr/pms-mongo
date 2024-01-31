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
const errorController = require('./controllers/errorController.js')
const swaggerAccessManagement = require('./doc/customization_src/controller/swaggerAccessManagement.js');
const { checkDevAuthentication } = require("./doc/customization_src/middleware/swaggerMiddleware.js");
const path = require("path");
// const axios = require("axios");
require("./controllers/autoMail.js");
require("./controllers/assetAutoMail.js");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'doc/customization_src/doc_templates/pages'));
app.use(express.static(path.join(__dirname,'./build')))
app.use(bodyParser.json({ limit: '500mb' }));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 50000,
  }),
);

app.use(cors());

// app.use(cors({
//   origin: [vari.ALLOWED_URL, vari.ALLOWED_URL],
//   methods: 'GET,HEAD,PUT,POST,DELETE',
//   credentials: true,
// }));
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", vari.ALLOWED_URL);
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api", routes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const docBackendRouter = require("./doc/customization_src/routes/backend_routes.js");
const docFrontendRouter = require("./doc/customization_src/routes/frontend_routes.js");
app.use("/", docBackendRouter);
app.use("/", docFrontendRouter);
app.use(
  "/api-docs/:token",
  checkDevAuthentication,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumantion, swaggerConfig)
);

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
