import * as React from 'react';
import { useState } from 'react';
import { TodoModel, todosList } from './data';
import { TodosView } from './TodosView';

export function TodosContainer() {
  const [todos, setTodos] = React.useState(todosList);

  const [completedTodos, setCompletedTodos] = useState<Array<boolean[]>>(
    todos.map((todo) => todo.subtasks.map((_) => false))
  );

  const subtaskIsCompleted = (todoIndex: number, subtaskIndex: number) => {
    return completedTodos[todoIndex][subtaskIndex] ?? false;
  };

  const toggleSubtaskIsCompleted = (
    todoIndex: number,
    subtaskIndex: number
  ) => {
    setCompletedTodos((prev) => {
      return prev.map((subtasks, _todoIndex) =>
        subtasks.map((isCompleted, _subtaskIndex) =>
          todoIndex === _todoIndex && subtaskIndex === _subtaskIndex
            ? !isCompleted
            : isCompleted
        )
      );
    });
  };

  const todoIsCompleted = (todoIndex: number) => {
    return completedTodos[todoIndex].every(Boolean);
  };

  const handleClear = () => {
    setTodos((_todos) =>
      _todos.filter((_, todoIndex) => !todoIsCompleted(todoIndex))
    );

    setCompletedTodos((prev) =>
      prev.filter((_, todoIndex) => !todoIsCompleted(todoIndex))
    );
  };

  const payload: TodoModel[] = todos.map((todo, todoIndex) => {
    const isCompleted = todoIsCompleted(todoIndex);
    const completedSubtasks = completedTodos[todoIndex];

    return {
      ...todo,
      isCompleted,
      completedSubtasks,
    };
  });

  return (
    <div>
      <button onClick={handleClear}>Clear Completed</button>
      <TodosView todos={payload} onSubtaskClick={toggleSubtaskIsCompleted} />
    </div>
  );
}
