# Nodejs Boilerplate Fastify

Nodejs Boilerplate Fastify is an MVC (Model-View-Controller) framework designed to help developers create REST APIs more efficiently. It leverages Fastify, a highly performant web framework for Node.js, along with several other essential packages for rapid and secure development.

## Features

- **Fast API Development**: Built with Fastify for optimal performance and quick setup of REST APIs.
- **Security**: Integrates `bcryptjs` for password hashing and `jsonwebtoken` for authentication.
- **Data Handling**: Uses `mongoose` for MongoDB object modeling and database interaction.
- **Logging**: Employs `winston` for effective logging and error handling.
- **Environment Management**: Supports `.env` files with `dotenv` for environment configuration.
- **Date Handling**: `moment` is used for easy date manipulation.
- **Cross-Platform Development**: `cross-env` helps manage environment variables across different operating systems.
- **TypeScript Support**: Developed with TypeScript to ensure type safety and better development experience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/9techofficial/Nodejs-Boilerplate-Fastify.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nodejs-boilerplate-fastify
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of your project, similar to `.env.example`.

5. Run the development server:
   ```bash
   npm run dev
   ```

## NPM Packages

### Dependencies:
- **[@fastify/cors](https://www.npmjs.com/package/@fastify/cors)**: Fastify CORS support.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Password hashing library.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file.
- **[fastify](https://www.npmjs.com/package/fastify)**: Fast, low-overhead web framework for Node.js.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Token-based authentication for secure APIs.
- **[moment](https://www.npmjs.com/package/moment)**: Date and time manipulation library.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: MongoDB object modeling for Node.js.
- **[winston](https://www.npmjs.com/package/winston)**: A versatile logger for Node.js applications.

### Dev Dependencies:
- **[@types/bcryptjs](https://www.npmjs.com/package/@types/bcryptjs)**: TypeScript definitions for `bcryptjs`.
- **[@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)**: TypeScript definitions for `jsonwebtoken`.
- **[@types/mongoose](https://www.npmjs.com/package/@types/mongoose)**: TypeScript definitions for `mongoose`.
- **[@types/node](https://www.npmjs.com/package/@types/node)**: TypeScript definitions for Node.js.
- **[cross-env](https://www.npmjs.com/package/cross-env)**: Set environment variables across platforms.
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Automatically restarts the server on file changes during development.
- **[ts-node](https://www.npmjs.com/package/ts-node)**: Run TypeScript directly in Node.js.
- **[typescript](https://www.npmjs.com/package/typescript)**: TypeScript compiler.

## Scripts

- `npm run dev`: Starts the development server with hot-reloading (using `nodemon`).
- `npm run build`: Compiles TypeScript code into JavaScript.
- `npm start`: Runs the compiled JavaScript in production mode.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Sponsor

If you find this project helpful and want to support its development, consider becoming a sponsor! Your contributions will help maintain the project and improve future features.

[![Sponsor](https://img.shields.io/badge/Sponsor-❤-red)](https://github.com/sponsors/9techofficial)

Any amount is greatly appreciated! 🙌

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

