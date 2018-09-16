import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import { Request, Response } from 'express';

import { User } from "Types";
import UserModel from '../models/users';

import config from "../config/config";

/**
 * Generates the JSON web token
 */
function generateToken(user: { username: string, email: string }) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds, 1 week
  });
}

// Set user info from request
function setUserInfo(user: User) {
  return {
    username: user.username,
    email: user.email,
  };
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export function getUserIdFromHeaders(headers: any) {
  if (headers && headers.Authorization) {
    // Get auth header and remove 'JWT' from front
    const authorization = headers.Authorization.split(" ")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(authorization, config.secret);
    } catch (e) {
      console.log("Could not get a userId from this header");
      return false;
    }
    // TODO: deal with this
    console.log("decoded:");
    console.log(decoded);
    return decoded.username;
  }
  console.error("getUserIdFromHeaders: Malformed passed in");
};

// Login Route
export function login(req: Request, res: Response) {
  const { email, password } = req.body;
  UserModel.findOne({ email }, (err: any, user: User) => {
    if (err) {
      return;
    }

    if (!user) {
      res.status(500).send("Your login details could not be verified. Please try again.");
    }

    user.comparePassword(password, (comparePasswordErr: any, isMatch: boolean) => {
      if (comparePasswordErr) {
        res.status(500).send("Your login details could not be verified. Please try again.");
      }

      if (!isMatch) {
        res
          .status(500)
          .send("Your login details could not be verified. Please try again.");
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
  // Check for registration errors
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: "You must enter an email address." });
  }

  // Return error if full name not provided
  if (!username) {
    return res.status(422).send({ error: "You must enter a username." });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: "You must enter a password." });
  }

  UserModel.findOne({ email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If user is not unique, return error
    if (existingUser) {
      return res
        .status(422)
        .send({ error: "That email address is already in use." });
    }

    // If email is unique and password was provided, create account
    const user = new UserModel({
      email,
      password,
      username
    });

    user.save((err: any, user: any) => {
      if (err) {
        return next(err);
      }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created
      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};
