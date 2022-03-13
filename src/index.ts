import path from "path";
import express from "express";
import birdsRouter from "./routes/birds";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const { PORT = 4040 } = process.env;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Restful API of Birds Data",
    version: "1.0.0",
    description: "A Birds REST API application based on Express.js",
    license: {
      name: "Licensed Under MIT",
      url: "https://github.com/amjedomar/birds-api/blob/main/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Dev server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "routes", "*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect(301, "/docs");
});

app.use("/birds", birdsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`The App is running on http://localhost:${PORT}`);
});
