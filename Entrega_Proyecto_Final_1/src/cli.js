import { program } from 'commander';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

program
  .option('-p, --persistence <type>', 'Establecer tipo de persistencia (MONGO, FILE)', 'MONGO')
  .parse(process.argv);

const options = program.opts();

if (options.persistence) {
  const envConfig = `PERSISTENCE=${options.persistence}\n`;
  const envPath = path.resolve(process.cwd(), '.env');

  fs.appendFileSync(envPath, envConfig);
  dotenv.config({ path: envPath });
}

import '../src/api.js'; 
