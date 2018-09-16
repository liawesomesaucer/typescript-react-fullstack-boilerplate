/**
 * Contains all the types for models. Models can be refactored into individual folders when needed
 */
export interface User {
  email: string,
  password: string,
  username: string,
  comparePassword: (candidatePassword: string, cb: any) => any,
};

export interface Todo {
  authorUsername: string,
  name: string,
  description: string,
}
