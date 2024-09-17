
import BaseService from '../framework/baseService';
import { UserModel } from '../models/userModel';

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }
}

export default new UserService();