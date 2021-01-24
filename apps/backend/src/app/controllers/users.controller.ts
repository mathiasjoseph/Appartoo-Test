import { Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { User } from '../interfaces/user.interface';

export class UsersController {
  repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();

  }

  async addFriend(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    const friendId = req.params.id;
    if (!id || !friendId) {
      res.status(401).send();
    }
    try {
      const user = await this.repository.addFriend(id, friendId);
      if (user) {
        return res.send(user);
      } else {
        res.status(400).send();
      }
    } catch (id) {
      res.status(401).send();
    }
    return;
  }

  async removeFriend(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    const friendId = req.params.id;
    if (!id || !friendId) {
      res.status(401).send();
    }
    try {
      const user = await this.repository.removeFriend(id, friendId);
      if (user) {
        return res.send(user);
      } else {
        res.status(400).send();
      }
    } catch (id) {
      res.status(401).send();
    }
    return;
  }

  async updateProfile(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    if (!id) {
      res.status(401).send();
    }

    let profile = {
      age: req.body.age,
      family: req.body.family,
      email: req.body.email,
      race: req.body.race,
      food: req.body.food,
      team: req.body.team,
      firstname: req.body.firstname,
      twitter: req.body.twitter,
      facebook: req.body.face
    };
    let user: User;
    try {
      user = await this.repository.update(id, profile);
      if (user) {
        user.password = null;
        return res.send(user);
      } else {
        res.status(401).send();
      }
    } catch (id) {
      res.status(401).send();
    }
    return;
  }

  async getAllUsers(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    if (!id) {
      res.status(401).send();
    }

    try {
      const users = await this.repository.findAll();
      return res.send(users);
    } catch (id) {
      res.status(401).send();
    }
    return;
  }


}
