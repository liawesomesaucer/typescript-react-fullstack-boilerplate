import { Request, Response } from 'express';

import { User } from 'Types';
import UserModel from '../models/users';

/**
 * The controller for handling users. Contains methods for
 * updating non-authentication-related user metadata
 * Does not handle password updates
 */
export function updateUser(req: Request, res: Response) {
  // TODO: deal with data properly
  // Make sure the user that is editing is the same one as this
  UserModel.findOneAndUpdate({
    username: req.params.username
  }, req.body.data);
};

export function createUser(req: Request, res: Response) {
  const user = new UserModel(req.body.user);
  user.save((err: any) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).send('ok');
  });
}

/**
 * The get route for the current user
 */
export function getMe(req: Request, res: Response) {
  if (!req.user) {
    res.status(400).send('Token was not passed');
    return;
  }
  res.json({ user: req.user });
};

/**
 * The get route for an existing user based on their user Id
 */
export function getUser(req: Request, res: Response) {
  if (!req.params.username) {
    res.status(400).send('Missing username');
    return;
  }
  UserModel.findOne({
    username: req.params.username,
  }, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return;
    }

    res.json({ user });
  });
};
