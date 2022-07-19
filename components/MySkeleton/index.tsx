import { Skeleton } from "antd";

const MySkeleton = ({ rows=3, bc = "#fff" }: { rows?: number; bc?: string }) => {
  return (
    <div style={{ background: bc, padding: "20px 40px 10px",borderRadius:'20px' ,margin:"20px 0" }}>
      <Skeleton active paragraph={{ rows }}></Skeleton>
    </div>
  );
};
export default MySkeleton;
