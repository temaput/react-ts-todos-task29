export const todosList = [
  {
    task: 'Clean bedroom',
    subtasks: ['Do laundry', 'Organize desk', 'Wipe floors'],
  },
  {
    task: 'Study',
    subtasks: ['Review chemistry', 'Do a React coding challenge'],
  },
  {
    task: 'Build website',
    subtasks: ['Choose tech stack', 'Design pages', 'Develop', 'Publish'],
  },
];

export type TodoDTO = typeof todosList[0];
