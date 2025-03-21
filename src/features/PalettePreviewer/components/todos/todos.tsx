import styles from "./todos.module.css";
import {
  todosArray,
  TodoType,
} from "@/features/PalettePreviewer/components/todos/todosLib";
import { useState } from "react";
import { cx } from "class-variance-authority";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const Todos = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todosList, setTodosList] = useState<TodoType[]>(todosArray);

  const handleTodoChange = (todoId: number) => {
    // set a todos "completed" field to true on click
    setTodosList((prev) =>
      prev.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  };

  const handleAddClick = () => {
    if (!inputValue) return;
    setTodosList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: inputValue,
        completed: false,
      },
    ]);
    setInputValue("");
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.todosList}>
        <h2 className={styles.title}>Short on memory?</h2>
        <li className={styles.inputItem}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            tabIndex={0}
            className={styles.addButtonWrapper}
            onClick={handleAddClick}
          >
            <PlusCircledIcon aria-hidden={true} className={styles.addButton} />
          </button>
        </li>

        {todosList.map((todo, index) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleTodoChange={() => handleTodoChange(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

const Todo = ({
  todo,
  handleTodoChange,
}: {
  todo: TodoType;
  handleTodoChange: () => void;
}) => {
  const [checked, setChecked] = useState(todo.completed);
  return (
    <li key={todo.id} className={styles.todoItem} onChange={handleTodoChange}>
      <input
        type={"checkbox"}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className={cx(todo.completed && styles.completedText)}>
        {todo.title}
      </span>
    </li>
  );
};
