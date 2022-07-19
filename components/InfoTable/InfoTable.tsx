import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { overviewData } from "types/types";



interface InfoTableProps {
  columns: ColumnsType<overviewData>;
  data: overviewData[];
}




const InfoTable = (InfoTableProps: InfoTableProps) => {
  const { columns, data } = InfoTableProps;
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default InfoTable;
