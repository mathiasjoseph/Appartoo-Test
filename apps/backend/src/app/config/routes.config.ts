import { AuthController } from '../controllers/auth.controller';
import * as express from 'express';
import { checkJwt } from '../middlewares/auth-jtw';
import { checkDuplicateUsernameOrEmail } from '../middlewares/check-sign-up';
import { UsersController } from '../controllers/users.controller';

export class RoutesConfig {
  public authController: AuthController = new AuthController();
  public usersController: UsersController = new UsersController();

  public routes(app: express.Application): void {
    app.use('/me', checkJwt);
    app.use('/change-password', checkJwt);
    app.use('/profile/update', checkJwt);
    app.use('/users', checkJwt);
    app.use('/friends/:id/remove', checkJwt);
    app.use('/friends/:id/add', checkJwt);
    app.use('/friends/create', checkJwt);
    app
      .route('/login')
      .post(this.authController.login.bind(this.authController));
    app.route('/me').get(this.authController.me.bind(this.authController));
    app
      .route('/friends/:id/remove')
      .post(this.usersController.removeFriend.bind(this.authController));
    app
      .route('/friends/:id/add')
      .post(this.usersController.addFriend.bind(this.authController));
    app
      .route('/friends/create')
      .post(this.usersController.createFriend.bind(this.usersController));
    app
      .route('/users')
      .get(this.usersController.getAllUsers.bind(this.usersController));
    app
      .route('/profile/update')
      .post(this.usersController.updateProfile.bind(this.usersController));
    app
      .route('/register')
      .post(this.authController.signUp.bind(this.authController), [
        checkDuplicateUsernameOrEmail
      ]);
  }
}
