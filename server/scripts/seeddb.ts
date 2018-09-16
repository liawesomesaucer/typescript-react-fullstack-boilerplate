/**
 * Function to pre populate some Users and Todos. Not touched by code, but you can
 * manually run this in the console:
 *
 *    $ # In the root directory of the project
 *    $ ./server/scripts/seeddb.ts
 */
import Todo from '../models/todos';
import User from '../models/users';

const seedTodos = [
  {
    authorUsername: 'vincent',
    name: 'Build some unicorns',
    description: 'Do it!!!@!@!@',
  },
  {
    authorUsername: 'vincent',
    name: 'Set up projects',
    description: 'It\'s time to start working',
  }
].map(t => new Todo(t));

seedTodos.forEach(t => t.save(function(err) {
  if (err) {
    console.error(err);
  }
}));

const seedUsers = [
  {
    username: 'vincent',
    email: 'vincent@vincent.com',
    password: 'password!!'
  },
].map(u => new User(u));

seedUsers.forEach(u => u.save(function(err) {
  if (err) {
    console.error(err);
  }
}));
