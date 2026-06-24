import swaggerJsdoc from "swagger-jsdoc";

const port = process.env["PORT"] || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Express API",
      version: "1.0.0",
      description: "A simple Express API application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
      },
    },
  },
  apis: ["src/routes/*.ts"],  // ← use src for dev, no build needed
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;