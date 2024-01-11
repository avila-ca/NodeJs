# SPRINT 7 CHAT

### 📋Description

It is a web that implements a multi-client chat with sockets protocol to chat with others directly, and http protocol to save all info in the MongoDB. The implemented functionalities are detailed below:

   - POST /userRegister: Register a client. Requires a body with {"name":"testName","password":"testPassword"}.
   - POST /userLogin: Login as a client. Requires a body with {"name":"testName","password":"testPassword"}.
   - POST /chat: Create a message. 
   - GET /chat/:id : Get the all previous messages. Requires a id param, it correspond to name room.


### 📥 Installation


To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/avila-ca/sockets-chat.git
```

Then, install the project dependencies:


```bash
cd sockets-chat
 npm install
```

```bash
cd /src/chat/infrastructure/react
npm install
```

Rename the .env-template file into .env. Then complete the MONGO_URI with your credentials.


### 🏁 How To Start

To start the server and client in development mode, run the following script:

```bash
cd sockets-chat
npm run dev
```


```bash
cd /src/chat/infrastructure/react
npm run dev
```

Then, open http://localhost:5173 to access the client.

###  Tests

To perform the tests, the environment variable DATABASE must be set to DATABASE='mongodb'.

```bash
npm run test
```



### 📝 Dependencies

- cors: middleware for handling Cross-Origin Resource Sharing (CORS)

- socket.io: enables real-time bidirectional event-based communication.

- dotenv: loads environment variables from a .env file

- express: web framework for Node.js

- express-promise-router: promise-based router for Express

- helmet: middleware for adding security headers

- mongodb: driver for MongoDB

- mysql: driver for MySQL


### 🛠️ Dev Dependencies

- @types/cors: TypeScript definitions for cors

- @types/express: TypeScript definitions for express

- @types/jest: TypeScript definitions for jest

- @types/mysql: TypeScript definitions for mysql

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- mysql: MySQL driver for Node.js

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching


