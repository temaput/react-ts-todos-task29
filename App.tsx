import * as React from 'react';
import { todosList } from './data';
import './style.css';
import { TodosView } from './TodoView';

export default function App() {
  const [todos, setTodos] = React.useState(todosList);
  return (
    <div>
      <h1>Todos!</h1>

      <TodosView todos={todos} updateTodos={setTodos} />
    </div>
  );
}
