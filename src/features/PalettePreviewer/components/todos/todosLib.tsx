export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}
export const todosArray: TodoType[] = [
  {
    id: 1,
    title: "Create a new project",
    completed: false,
  },
  {
    id: 2,
    title: "Add a new feature",
    completed: false,
  },
  {
    id: 3,
    title: "Push changes to GitHub",
    completed: false,
  },
  {
    id: 4,
    title: "Deploy the project",
    completed: false,
  },
];
