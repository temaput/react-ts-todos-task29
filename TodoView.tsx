import { useState } from 'react';
import * as React from 'react';
import { TodoDTO } from './data';

interface Props {
  todos: TodoDTO[];
  updateTodos: (todos: TodoDTO[]) => void;
}
function makeSubtaskKey(todoIndex: number, subtaskIndex: number) {
  return `${todoIndex}-${subtaskIndex}`;
}
export function TodosView({ todos, updateTodos }: Props) {
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
    const key = makeSubtaskKey(todoIndex, subtaskIndex);
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
    const filteredTodos = todos.filter(
      (_, todoIndex) => !todoIsCompleted(todoIndex)
    );
    updateTodos(filteredTodos);

    setCompletedTodos((prev) =>
      prev.filter((_, todoIndex) => !todoIsCompleted(todoIndex))
    );
  };

  return (
    <div>
      <button onClick={handleClear}>Clear Completed</button>
      <ul>
        {todos.map((todo, todoIndex) => (
          <li key={todo.task}>
            <h4>
              <ConditionalLabel isStrikeThrough={todoIsCompleted(todoIndex)}>
                {todo.task}
              </ConditionalLabel>
            </h4>
            <ul>
              {todo.subtasks.map((subtask, subtaskIndex) => {
                return (
                  <li
                    key={subtask}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      toggleSubtaskIsCompleted(todoIndex, subtaskIndex)
                    }
                  >
                    <ConditionalLabel
                      isStrikeThrough={subtaskIsCompleted(
                        todoIndex,
                        subtaskIndex
                      )}
                    >
                      {subtask}
                    </ConditionalLabel>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConditionalLabel({
  children,
  isStrikeThrough,
}: React.PropsWithChildren<{
  isStrikeThrough: boolean;
}>) {
  if (isStrikeThrough) {
    return <s>{children}</s>;
  } else {
    return <span>{children}</span>;
  }
}
