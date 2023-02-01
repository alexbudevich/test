import * as Joi from 'joi'; // Should use 17.0.0 or 17.0.2 version for Node v12 or later, or 16.1.8 for older versions of Node

export default () =>
  Joi.object({
    DATABASE_HOST: Joi.string().default(''),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USERNAME: Joi.string().default(''),
    DATABASE_PASSWORD: Joi.string().default(''),
    DATABASE_DATABASE: Joi.string().default(''),
    BD_MIGRATION_RUN: Joi.boolean().default(false),
  });
