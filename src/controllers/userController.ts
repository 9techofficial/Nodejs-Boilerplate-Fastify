
import BaseController from '../framework/baseController';
import UserService from '../services/userService';
import { UserModel } from '../models/userModel';

class UserController extends BaseController {
  constructor() {
    super(UserModel, UserService);
  }
}

export default new UserController();