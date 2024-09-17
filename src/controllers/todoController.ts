import BaseController from '../framework/baseController';
import TodoService from '../services/todoService';
import { TodoModel } from '../models/todoModel';

class TodoController extends BaseController {
  constructor() {
    super(TodoModel, TodoService);
  }
}

export default new TodoController();
