import path from 'path';
import express from 'express';
import cors from 'cors';
import birdsRouter from './routes/birds';
import swaggerJSDoc, {
  SwaggerDefinition,
  Options as SwaggerOptions,
} from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { PORT = 4040, DEV_SERVER_URL } = process.env;

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Birds API',
    version: '1.0.0',
    description:
      'A Public Restful API server based on Express.js, To retrieve and manipulate birds data',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://github.com/amjedomar/birds-api/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}` ?? DEV_SERVER_URL,
      description: 'Dev Server',
    },
  ],
};

const options: SwaggerOptions = {
  swaggerDefinition,
  apis: [path.join(__dirname, 'routes', '*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect(301, '/docs');
});

app.use('/birds', birdsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`The App is running on http://localhost:${PORT}`);
});
