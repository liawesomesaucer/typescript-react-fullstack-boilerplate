import passport from "passport";
import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

import { User } from "Types";
import UserModel from '../models/users';

import config from "../config/config";

/**
 * Generates the JSON web token
 */
function generateToken(user: { username: string, _id: string }) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds, 1 week
  });
}

// Set user info from request
function setUserInfo(user: User) {
  return {
    username: user.username,
    _id: user._id,
  };
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/**
 * Utility function to grab the user id from auth headers
 */
export function getUserIdFromHeaders(headers: any) {
  if (headers && headers.Authorization) {
    // Get auth header and remove 'JWT' from front
    const authorization = headers.Authorization.split(" ")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(authorization, config.secret);
    } catch (e) {
      console.error("Could not get a userId from this header");
      return false;
    }
    return decoded._id;
  }
  console.error("getUserIdFromHeaders: Malformed passed in");
};

// Login Route
export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  UserModel.findOne({ username }, (err: any, user: User) => {
    if (err) {
      return res.status(500).send('An unexpected error occurred');
    }

    if (!user) {
      return res.status(401).send("Your login details could not be verified. Please try again.");
    }

    user.comparePassword(password, (comparePasswordErr: any, isMatch: boolean) => {
      if (comparePasswordErr || !isMatch) {
        res.status(401).send("Your login details could not be verified. Please try again.");
      }

      const userInfo = setUserInfo(user);
      res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};

// Registration Route
export function register(req: Request, res: Response, next: any) {
  const { username, password } = req.body;

  // Return error if full name not provided
  if (!username) {
    return res.status(422).send({ error: "You must enter a username." });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: "You must enter a password." });
  }

  UserModel.findOne({ username }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If user is not unique, return error
    if (existingUser) {
      return res
        .status(422)
        .send({ error: "That username is already in use." });
    }

    // If username is unique and password was provided, create account
    const user = new UserModel({
      password,
      username
    });

    user.save((err: any, user: any) => {
      if (err) {
        return next(err);
      }

      // Respond with JWT if user was created
      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};
