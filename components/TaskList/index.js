import React from "react";
import styles from "./taskList.module.scss";
import TaskItem from "../TaskItem";
import { message } from "antd";

const TaskList = ({ taskList, setTaskList, setPickedTask, showDrawerItem }) => {
  if (!taskList?.length)
    return (
      <div className={styles.emptyTaskList}>
        <p>No tasks available</p>
      </div>
    );
  const onDelete = (id) => {
    setPickedTask(null);
    setTaskList((preTaskList) => preTaskList.filter((task) => task.id !== id));
    message.success("Deleted successfully");
  };
  const onCompleted = (id) => {
    setTaskList((preTaskList) =>
      preTaskList.map((task) =>
        task.id === id ? { ...task, status: 3 } : task
      )
    );

    message.success("Task done");
  };
  const onChangeSelected = (id, value) => {
    setTaskList((preTaskList) => {
      const task = preTaskList.find((task) => task.id === id);
      const idxTask = preTaskList.findIndex((task) => task.id === id);
      return [
        ...preTaskList.slice(0, idxTask),
        {
          ...task,
          isSelected: value,
        },
        ...preTaskList.slice(idxTask + 1),
      ];
    });
  };
  return (
    <div className={styles.taskList}>
      {taskList.map((task) => (
        <TaskItem
          data={task}
          key={task.id}
          setPickedTask={setPickedTask}
          onDelete={onDelete}
          onCompleted={onCompleted}
          showDrawerItem={showDrawerItem}
          onChangeSelected={onChangeSelected}
        />
      ))}
    </div>
  );
};

export default TaskList;
