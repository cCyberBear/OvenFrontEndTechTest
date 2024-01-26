import { CheckCircleFilled, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Card, Checkbox, Space, message } from "antd";
import StatusTag from "../StatusTag";

const TaskItem = ({
  data,
  setPickedTask,
  onDelete,
  onCompleted,
  showDrawerItem,
  onChangeSelected,
}) => {
  return (
    <Card
      size="large"
      title={
        <Space>
          <Checkbox
            checked={data.isSelected}
            onChange={(e) => onChangeSelected(data.id, e.target.checked)}
          />
          <div>{data.name}</div>
        </Space>
      }
      extra={<StatusTag value={data.status} />}
      actions={[
        <CheckCircleFilled
          key="setting"
          onClick={() => onCompleted(data.id)}
        />,
        <DeleteFilled key="delete" onClick={() => onDelete(data.id)} />,
        <EditFilled
          key="edit"
          onClick={() => {
            setPickedTask(data);
            showDrawerItem();
          }}
        />,
      ]}
    >
      <p>{data.description}</p>
    </Card>
  );
};

export default TaskItem;
