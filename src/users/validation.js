import Joi from 'joi';

const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .optional()
    .messages({
      'string.base': 'Name must be a text string.',
      'string.min': 'Name must be at least 2 characters long.',
      'string.max': 'Name must be at most 30 characters long.',
    }),

  first_name: Joi.string()
    .min(2)
    .max(30)
    .optional()
    .messages({
      'string.base': 'First name must be a text string.',
      'string.min': 'First name must be at least 2 characters long.',
      'string.max': 'First name must be at most 30 characters long.',
    }),

  last_name: Joi.string()
    .min(2)
    .max(30)
    .optional()
    .messages({
      'string.base': 'Last name must be a text string.',
      'string.min': 'Last name must be at least 2 characters long.',
      'string.max': 'Last name must be at most 30 characters long.',
    }),

  bio: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.base': 'Bio must be a text string.',
      'string.max': 'Bio must be no longer than 500 characters.',
    }),
});

export const UserValidation = {
  updateUserSchema,
};
