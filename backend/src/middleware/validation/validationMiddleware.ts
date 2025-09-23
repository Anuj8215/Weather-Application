//SECTION - This code is written to create authentication validation middleware for an Express application using JWT (JSON Web Tokens).

import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { email, username, password } = req.body;
  const errors: string[] = [];

  //NOTE - Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  //NOTE - Username validation
  if (!username || !validator.isLength(username, { min: 3, max: 30 })) {
    errors.push('Username must be between 3 to 30 characters');
  }
  if (username && !validator.isAlphanumeric(username.trim())) {
    errors.push('Username must be alphanumeric');
  }

  //NOTE - Password validation
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters long');
  }
  if (
    password &&
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push(
      'Password must include uppercase, lowercase, number and symbol',
    );
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  } else {
    next();
  }
};
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { email, password } = req.body;
  const errors: string[] = [];

  //NOTE - Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  //NOTE - Password validation
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters long');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  } else {
    next();
  }
};
export const validateLocationUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { locations } = req.body;

  if (!Array.isArray(locations)) {
    res.status(400).json({
      success: false,
      message: 'Locations must be an array',
    });
    return;
  }

  const errors: string[] = [];

  locations.forEach((location, index) => {
    if (!location.name || validator.isEmpty(location.name.trim())) {
      errors.push(`Location ${index + 1}: Name is required`);
    }

    if (
      typeof location.latitude !== 'number' ||
      location.latitude < -90 ||
      location.latitude > 90
    ) {
      errors.push(
        `Location ${index + 1}: Valid latitude (-90 to 90) is required`,
      );
    }

    if (
      typeof location.longitude !== 'number' ||
      location.longitude < -180 ||
      location.longitude > 180
    ) {
      errors.push(
        `Location ${index + 1}: Valid longitude (-180 to 180) is required`,
      );
    }
  });

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
    return;
  }

  next();
};
