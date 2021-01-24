import { Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import * as jwt from 'jsonwebtoken';
import { securityConfig } from '../config/security.config';

export class AuthController {
  repository: UserRepository;
  service: AuthService;

  constructor() {
    this.repository = new UserRepository();
    this.service = new AuthService();
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    if (!(username && password)) {
      res.status(400).send();
    }

    let user: User;
    try {
      user = await this.repository.findOneByUsername(username);
      console.log(user);
      if (!user) {
        res.status(401).send();
        return;
      }
    } catch (error) {
      res.status(401).send();
      return;
    }
    if (!this.service.checkIfUnencryptedPasswordIsValid(user, password)) {
      res.status(401).send();
      return;
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      securityConfig.secret,
      { expiresIn: securityConfig.expiresIn }
    );
    res.send({ token });
  }

  async me(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    if (!id) {
      res.status(401).send();
    }
    let user: User;
    try {
      user = await this.repository.findOneById(id);
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


  async signUp(req: Request, res: Response) {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password: this.service.encode(req.body.password)
    };

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

}
