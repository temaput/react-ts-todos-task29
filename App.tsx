import * as React from 'react';
import { todosList } from './data';
import './style.css';
import { TodosContainer } from './TodosContainer';

export default function App() {
  return (
    <div>
      <h1>Todos!</h1>

      <TodosContainer />
    </div>
  );
}
