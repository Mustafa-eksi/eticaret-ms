import Joi from "joi";

export const permissionsjoi = Joi.object({
    ms: [Joi.array().items(Joi.string()), Joi.string().valid("all")],
    action: [Joi.array().items(Joi.string()), Joi.string().valid("all")]
})

// Same as database/models/admin.ts
export const adminjoi = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    permissions: permissionsjoi.required()
});

export const credentialsjoi = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    permissions: permissionsjoi.optional()
});