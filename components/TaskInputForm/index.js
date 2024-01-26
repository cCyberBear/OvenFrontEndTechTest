import React, { useEffect } from "react";
import styles from "./taskInputForm.module.scss";
import { Button, Col, Form, Input, Row, Select, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { STATUS } from "@/utils/variable";
const TaskInputForm = ({ setTaskList, setPickedTask, pickedTask }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (pickedTask) {
      message.success("Saved successfully");
      setTaskList((preTaskList) =>
        preTaskList.map((task) =>
          task.id === pickedTask.id ? { ...task, ...values } : task
        )
      );
    } else {
      setTaskList((preTaskList) => {
        const newTask = {
          id: Date.now() + Math.random(),
          isSelected: false,
          ...values,
        };
        return [newTask, ...preTaskList];
      });
      message.success("Created successfully");
      form.resetFields();
    }
  };

  const onDelete = () => {
    setTaskList((preTaskList) =>
      preTaskList.filter((task) => task.id !== pickedTask.id)
    );
    setPickedTask(null);
    message.success("Deleted successfully");
  };

  useEffect(() => {
    if (pickedTask) {
      form.setFieldsValue(pickedTask);
    } else {
      form.resetFields();
    }
  }, [pickedTask]);

  return (
    <div className={styles.taskInputForm}>
      <Form
        form={form}
        name="task form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <h2>{pickedTask ? "Update Task" : "Add New Task"}</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Task's name!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your Task's name!",
            },
          ]}
        >
          <TextArea rows={4} size="large" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input your Task's name!",
            },
          ]}
        >
          <Select size="large" options={STATUS} />
        </Form.Item>
        <Row gutter={[24]}>
          <Col span={12}>
            {pickedTask && (
              <Form.Item>
                <Button block danger onClick={onDelete} size="large">
                  Delete
                </Button>
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button block type="primary" htmlType="submit" size="large">
                {pickedTask ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TaskInputForm;
