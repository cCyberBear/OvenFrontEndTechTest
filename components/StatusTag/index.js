import { STATUS } from "@/utils/variable";
import { Tag } from "antd";

const StatusTag = ({ value }) => {
  const option = STATUS.find((item) => item.value === value);

  return <Tag color={option.color}>{option.label}</Tag>;
};

export default StatusTag;
