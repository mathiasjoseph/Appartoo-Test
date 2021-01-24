import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

export class AuthService {
  checkIfUnencryptedPasswordIsValid(user: User, plainPassword: string) {
    return bcrypt.compareSync(plainPassword, user.password);
  }

  encode(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8);
  }

  encodeFromUser(user: User) {
    user.password = this.encode(user.password);
    return user;
  }
}
