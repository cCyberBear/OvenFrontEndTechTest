"use client";
import TaskInputForm from "@/components/TaskInputForm";
import TaskList from "@/components/TaskList";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Grid, Row, message } from "antd";
import { useState } from "react";
import styles from "./page.module.scss";
const { useBreakpoint } = Grid;

export default function Home() {
  const [taskList, setTaskList] = useState([
    {
      id: 0,
      name: "This is task 0",
      description: "This is description of task 0",
      status: 1,
      isSelected: false,
    },
  ]);
  const [pickedTask, setPickedTask] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isSmallScreen = !screens.lg && !screens.md;

  const showDrawer = () => {
    setDrawerVisible(true);
    setPickedTask(null);
  };
  const showDrawerItem = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const onDeleteTasks = () => {
    setPickedTask(null);
    setTaskList((preTaskList) =>
      preTaskList.filter((task) => !task.isSelected)
    );
    message.success("Deleted successfully");
  };

  const onDoneTasks = () => {
    setTaskList((preTaskList) =>
      preTaskList.map((task) =>
        task.isSelected ? { ...task, status: 3, isSelected: false } : task
      )
    );
    message.success("Tasks marked as done");
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <Row gutter={[24]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <h1 className={styles.main_heading}>Khuong Duy&apos;s TODO LIST</h1>

            <Row gutter={[24, 24]} className={styles.main}>
              <Col span={24}>
                <Button
                  block
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={showDrawer}
                >
                  Add New Task
                </Button>
              </Col>

              <Col span={12}>
                <Button block danger onClick={onDeleteTasks} size="large">
                  Delete Tasks
                </Button>
              </Col>
              <Col span={12}>
                <Button block type="primary" onClick={onDoneTasks} size="large">
                  Done Tasks
                </Button>
              </Col>
            </Row>
            <Divider dashed />
            <TaskList
              showDrawerItem={showDrawerItem}
              taskList={taskList}
              setPickedTask={setPickedTask}
              setTaskList={setTaskList}
            />
          </Col>
          <Col lg={12} md={12} sm={0} xs={0}>
            <div className={styles.main_right}>
              <div className={styles.main_right_background}>
                <TaskInputForm
                  setTaskList={setTaskList}
                  setPickedTask={setPickedTask}
                  pickedTask={pickedTask}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {isSmallScreen && (
        <Drawer
          title={pickedTask ? "Update Task" : "Add New Task"}
          placement="right"
          closable={true}
          onClose={onCloseDrawer}
          open={drawerVisible}
          width={450}
        >
          <TaskInputForm
            setTaskList={setTaskList}
            setPickedTask={setPickedTask}
            pickedTask={pickedTask}
          />
        </Drawer>
      )}
    </main>
  );
}
