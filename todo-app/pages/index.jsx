import cx from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/Home.module.css";

const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([]);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (todoItem) {
      setItems([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        },
        ...items,
      ]);

      setTodoItem("");
    }
  };

  const handleDone = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    });

    setItems(_items);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="pt-12">
        <h6 className="mb-2 text-xs font-bold uppercase">Learning React</h6>
        <h1 className="text-4xl">Todo App</h1>
      </div>

      <div className="pt-12">
        <input
          type="text"
          value={todoItem}
          className="w-full rounded py-2 px-4 text-gray-900"
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>

      <ul className="pt-12">
        {items
          .filter(({ done }) => !done)
          .map(({ id, message }) => (
            <li
              key={id}
              className={cx(styles.item)}
              onClick={() => handleDone(id)}
            >
              {message}
            </li>
          ))}

        {items
          .filter(({ done }) => done)
          .map(({ id, message }) => (
            <li
              key={id}
              className={cx(styles.item, styles.done)}
              onClick={() => handleDone(id)}
            >
              {message}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
