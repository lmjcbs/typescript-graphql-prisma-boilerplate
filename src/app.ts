import cors from 'cors';
import express from 'express';

const app = express();

// enable CORS
app.use(cors());

export { app };
