import dotenv from 'dotenv';
import path from 'path';
import * as Yup from 'yup';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define environment variables schema and validations
const envVarsSchema = Yup.object().shape({
  NODE_ENV: Yup.string().required().oneOf(['development', 'test', 'production']),
  PORT: Yup.number().required().default(3000),
});

envVarsSchema.validate(process.env).catch((err: Error) => {
  throw new Error(err.message);
});

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
