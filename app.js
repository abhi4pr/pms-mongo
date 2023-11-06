const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');
const vari = require('./variables.js');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocumantion = require('./doc/swaggerDoc.js');
const OpenAI = require("openai");

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/uploads/productImage', express.static(__dirname + '/uploads/productImage'));
app.use('/api', routes);
const customCss = `
  .swagger-ui .topbar .link {
    content: url('/uploads/assets/logo-light.png'); /* Relative to the server root */
  }

`;
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumantion));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumantion, {
  // explorer: true,
  customCss,
  swaggerOptions: {
    docExpansion: 'none',
  }
}));

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

mongoose.connect(vari.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'instaDB'
}).then(() => {
  console.log('DB connected');
})
  .catch((err) => {
    console.log(err);
  })

app.listen(vari.PORT, () => {
  console.log('server is running at ' + vari.API_URL);
});