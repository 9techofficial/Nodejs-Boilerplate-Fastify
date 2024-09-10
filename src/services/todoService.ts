import BaseService from '../framework/baseService';
import { TodoModel } from '../models/todoModel';

class TodoService extends BaseService {
  constructor() {
    super(TodoModel);
  }
}

export default new TodoService();