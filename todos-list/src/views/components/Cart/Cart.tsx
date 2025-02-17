import React, { useState } from "react";

import { Drawer, DrawerProps } from "antd";
import { CarryOutOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";
import { useToDoStore } from "../../../data/stores/useToDoStore";

interface doneTask {
  id: string;
  title: string;
}

const stylesDrawer = {
    header: {
      textAlign: "center" as "center",
      color: "#3F72AF",

    },
  };


console.log(Date.now());


export const Cart: React.FC<doneTask> = () => {
  const doneTasks = useToDoStore((state) => state.doneTasks);
  const doneCount = useToDoStore((state) => state.doneCount);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        <div className={styles.drawerContainer}>
          <Drawer
            className={styles.drawer}
            title="Сompleted tasks"
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
            width="300px"
            styles={stylesDrawer}
            // getContainer={false}
          >
            <ul>
              {doneTasks.map((task) => (
                <li key={task.id} className={styles.cartTask} style={{marginBottom: '15px'}}>
                  {task.title}
                </li>
              ))}
            </ul>
          </Drawer>
        </div>
        <button
          type="button"
          className={styles.cartContentButton}
          onClick={showDrawer}
        >
          <CarryOutOutlined style={{ fontSize: "30px", color: "#3F72AF" }} />
        </button>
        <div className={styles.cartContentCounter}>{doneCount}</div>
      </div>
    </div>
  );
};
