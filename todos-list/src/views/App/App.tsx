import React, { useState } from "react";

import { useToDoStore } from "../../data/stores/useToDoStore.ts";
import { InputPlus } from "../components/InputPlus/InputPlus.tsx";
import { InputTask } from "../components/InputTask/InputTask.tsx";

import styles from "./index.module.scss";
import { Cart } from "../components/Cart/Cart.tsx";

export const App: React.FC = () => {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);
  const addToCart = useToDoStore((state) => state.addToCart);
  

  return (
    <article className={styles.article}>
        
            <Cart id={""} title={""} />
        
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is not one task.</p>
        )}
        {tasks.map((task) => (
            <InputTask 
                key={task.id}
                id={task.id}
                title={task.title}
                onDone={addToCart}
                onEdited={updateTask}
                onRemoved={removeTask}
            />
        ))
        }
      </section>
    </article>
  );
};
