import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cafe Express API",
      version: "1.0.0",
      description:
        "API for managing products, transport, modificators and categories",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://api.justdev24.ru",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./server/routes/*.js"], // Путь к файлам с аннотациями
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};
