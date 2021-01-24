import { UserRepository } from '../repository/user.repository';

export async function checkDuplicateUsernameOrEmail(req, res, next) {
  const repository = new UserRepository();
  try {
    const userByUsername = await repository.findOneByUsername(req.body.username);
    if (userByUsername) {
      res.status(400).send({ message: 'Oups! Ce nom de pangolin est déja utilisé' });
      return;
    }
  } catch (e) {
    res.status(500).send({ message: e });
    return;
  }
  try {
    const userByEmail = await repository.findOneByEmail(req.body.email);
    if (userByEmail) {
      res.status(400).send({ message: 'Oups! Cette email de pangolin est déja utilisé' });
      return;
    }
  } catch (e) {
    res.status(500).send({ message: e });
    return;
  }
  next();
}
