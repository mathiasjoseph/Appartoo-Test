import { Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { User } from '../interfaces/user.interface';
import { securityConfig } from '../config/security.config';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
export class UsersController {
  repository: UserRepository;
  service: AuthService;

  constructor() {
    this.repository = new UserRepository();
    this.service = new AuthService();

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



  async createFriend(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    if (!id) {
      res.status(401).send();
    }

    console.log(req.body)
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password: this.service.encode(req.body.password)
    };

    user.friends = [id];

    try {
      const newUser = await this.repository.createOne(user);
      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username },
        securityConfig.secret,
        { expiresIn: securityConfig.expiresIn }
      );
      res.send({ token });
    } catch (err) {
      res.status(500).send({ message: err });
      return;
    }
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
