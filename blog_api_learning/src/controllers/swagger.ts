// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Express API',
      version: '1.0.0',
        description: 'A simple Express API application',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                in: 'header',
                description: 'Enter your JWT token in the format **Bearer &lt;token&gt;**',
            }
        }
    }
  },
  apis: ['./routes/*.ts'], // Path to API route files
};

 const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;