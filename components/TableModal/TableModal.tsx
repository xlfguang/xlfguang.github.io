import { Modal, Table } from "antd";
import { detailsTable } from "types/types";
import type { ColumnsType } from "antd/lib/table";
interface tableModal {
  show: boolean;
  onCancel?: () => void;
  columns: ColumnsType<detailsTable>;
  data: detailsTable[];
}

const TableModal = (tableModal: tableModal) => {
  const { show, onCancel, data, columns } = tableModal;
  return (
    <Modal
      title="asd"
      visible={show}
      onCancel={onCancel}
      footer={null}
      width={1400}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};
export default TableModal;
