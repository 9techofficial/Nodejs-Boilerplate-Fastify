import { logInfo } from "../../utilities/logger";

const fs = require('fs');
const path = require('path');

// Get the module name from the command line arguments
const args: string[] = process.argv.slice(2);
const moduleName: string | undefined = args[0];

if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}
const moduleNameCap: string = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Define paths for controllers, services, and models
const controllerDir: string = path.join(__dirname, '../../controllers');
const serviceDir: string = path.join(__dirname, '../../services');
const modelDir: string = path.join(__dirname, '../../models');

// Templates for the files
const controllerTemplate: string = `
import BaseController from '../framework/baseController';
import { ${moduleNameCap}Model } from '../models/${moduleName}Model';
import ${moduleNameCap}Service from '../services/${moduleName}Service';\n
class ${moduleNameCap}Controller extends BaseController {
  constructor() {
    super(${moduleNameCap}Model, ${moduleNameCap}Service);
  }
}\n
export default new ${moduleNameCap}Controller();`;

const serviceTemplate: string = `
import BaseService from '../framework/baseService';
import { ${moduleNameCap}Model } from '../models/${moduleName}Model';\n
class ${moduleNameCap}Service extends BaseService {
  constructor() {
    super(${moduleNameCap}Model);
  }
}\n
export default new ${moduleNameCap}Service();`;

const modelTemplate: string = `
import mongoose, { Schema, Document } from 'mongoose';

// Typescript variables
export type T${moduleNameCap} = {
  title: string;
  deletedAt?: Date;
};

// Define interface
interface I${moduleNameCap} extends Document, T${moduleNameCap} { }

// Build Schema
const ${moduleNameCap}Schema: Schema = new Schema({
  title: { type: String, required: true },
  deletedAt: { type: Date, required: false }
}, { timestamps: true });
export const ${moduleNameCap}Model = mongoose.model<I${moduleNameCap}>('${moduleNameCap}', ${moduleNameCap}Schema);`;

// Ensure directories exist
[controllerDir, serviceDir, modelDir].forEach((dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Function to create a file with the given template
const createFile = (dir: string, fileName: string, template: string): void => {
  const filePath: string = path.join(dir, fileName);

  if (fs.existsSync(filePath)) {
    logInfo.error(`${filePath} already exists.`);
    return;
  }

  fs.writeFileSync(filePath, template);
  logInfo.info(`${filePath} created.`);
};

// Create the files for the controller, service, and model
createFile(controllerDir, `${moduleName}Controller.ts`, controllerTemplate);
createFile(serviceDir, `${moduleName}Service.ts`, serviceTemplate);
createFile(modelDir, `${moduleName}Model.ts`, modelTemplate);

// Adding the route to the routes.ts file
const routeLine = `baseRoutes(app, '${moduleName}', '${moduleName}Controller');`;

// Read the routes.ts file
const routesFilePath = path.join(__dirname, '../../routes/routes.ts');
fs.readFile(routesFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error(`Error reading routes file: ${err}`);
    return;
  }

  // Check if the line already exists to prevent duplicates
  if (data.includes(routeLine)) {
    logInfo.info('Route already exists in the routes file.');
    return;
  }

  // Find the location where we want to insert the line
  const insertAt = `// CRUD routes`;

  // Insert the route after the CRUD routes comment
  const updatedData = data.replace(insertAt, `${insertAt}\n  ${routeLine}`);

  // Write the updated content back to the routes.ts file
  fs.writeFile(routesFilePath, updatedData, 'utf8', (writeErr: NodeJS.ErrnoException | null) => {
    if (writeErr) {
      console.error(`Error writing to routes file: ${writeErr}`);
      return;
    }
  });
});