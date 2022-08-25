import User from '../models/User';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  public getUserById = (id: number): Promise<User | null> =>
    User.findOne({ where: { id } });
}

export default new UserController();
