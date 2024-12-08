import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Service Aggregator API is running');
});

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  app.use('/', router);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});