import { Request, Response } from 'express';
import TodoModel from '../models/todos';

/**
 * Controller for a todo by id
 */
export function todo(req: Request, res: Response) {
  TodoModel.findById(req.params.todoId, (err: any, todo: any) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An unexpected error occurred');
    }
    res.status(200).json({ todo });
  })
}

/**
 * Controller for returning all todos
 */
export function todos(req: Request, res: Response) {
  TodoModel.find({}, (err: any, todos: any) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An unexpected error occurred');
    }
    res.status(200).json({ todos });
  });
}

/**
 * Controller for creating and saving a todo to the db
 */
export function createTodo(req: Request, res: Response) {
  const todo = new TodoModel(req.body.body.data);
  todo.save((err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An unexpected error occurred');
    }
    res.status(200).send('ok');
  });
}

/**
 * Controller for deleting a todo
 */
export function deleteTodo(req: Request, res: Response) {
  const { _id } = req.params;
  TodoModel.findByIdAndDelete(_id, (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An unexpected error occurred');
    }
    res.status(200).send('ok');
  })
}
