import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  authorUsername: {
    type: String,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
