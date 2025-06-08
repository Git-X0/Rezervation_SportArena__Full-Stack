import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

// Validation middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Reservation validation rules
export const reservationValidation = {
    create: [
        body("firstname")
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage("Jméno musí mít 2-50 znaků"),
        body("lastname")
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage("Příjmení musí mít 2-50 znaků"),
        body("date").isDate().withMessage("Neplatné datum"),
        body("time_slot")
            .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .withMessage("Neplatný časový formát (HH:MM)"),
        body("sportId").isInt({ min: 1 }).withMessage("Neplatné ID sportu"),
        body("sportLocationId")
            .isInt({ min: 1 })
            .withMessage("Neplatné ID sportoviště"),
        validate,
    ],

    update: [
        param("id").isInt({ min: 1 }).withMessage("Neplatné ID rezervace"),
        body("firstname")
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage("Jméno musí mít 2-50 znaků"),
        body("lastname")
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage("Příjmení musí mít 2-50 znaků"),
        body("date").optional().isDate().withMessage("Neplatné datum"),
        body("time_slot")
            .optional()
            .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .withMessage("Neplatný časový formát (HH:MM)"),
        body("sportId")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Neplatné ID sportu"),
        body("sportLocationId")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Neplatné ID sportoviště"),
        validate,
    ],

    delete: [
        param("id").isInt({ min: 1 }).withMessage("Neplatné ID rezervace"),
        validate,
    ],
};
