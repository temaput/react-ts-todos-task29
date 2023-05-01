import { useState } from 'react';
import * as React from 'react';
import { TodoDTO, TodoModel } from './data';

interface Props {
  todos: TodoModel[];
  onSubtaskClick: (todoIndex: number, subtaskIndex: number) => void;
}

export function TodosView({ todos, onSubtaskClick }: Props) {
  return (
    <ul>
      {todos.map((todo, todoIndex) => (
        <li key={todo.task}>
          <h4>
            <ConditionalLabel isStrikeThrough={todo.isCompleted}>
              {todo.task}
            </ConditionalLabel>
          </h4>
          <ul>
            {todo.subtasks.map((subtask, subtaskIndex) => {
              return (
                <li
                  key={subtask}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSubtaskClick(todoIndex, subtaskIndex)}
                >
                  <ConditionalLabel
                    isStrikeThrough={todo.completedSubtasks[subtaskIndex]}
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
