import { Request, Response } from 'express';

import UserModel from '../models/users';

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
