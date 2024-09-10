import { TodoModel } from '../models/todoModel';
import BaseController from '../framework/baseController';
import TodoService from '../services/todoService';

class TodoController extends BaseController {
  constructor() {
    super(TodoModel, TodoService);
  }
}

export default new TodoController();
