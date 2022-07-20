import exportPDF from "@public/exportPDF";
import { Modal, Checkbox, Space, DatePicker } from "antd";
import { useState } from "react";

const ExportPdf = ({ typeOptions }: { typeOptions: any }) => {
  const { RangePicker } = DatePicker;
  const [checkBoxShow, setcheckBoxShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const exportpdf = () => {
    let data = {
      prakInfo: {
        id: 0,
        name: "成都园区",
        area: "58000",
        num: 0,
        address: "成都市高新区",
        emissionLoad: "",
        region: "",
        type: "工业园区",
        reduce: "",
      },
      parkStatistics: [
        {
          id: 0,
          name: "工业用电",
          emissionLoad: "1548.154",
          carbonEquivalent: "2266",
          startTime: "2022/7/11",
        },
        {
          id: 1,
          name: "交通用电",
          emissionLoad: "1548.154",
          carbonEquivalent: "2266",
          startTime: "2022/7/11",
        },
      ],
    };
    let name = "";
    let domName = "demo";
    exportPDF(data, name, domName);
  };
  const selectReport = () => {
    setcheckBoxShow(true);
  };
  return (
    <div>
      <div className="m24 flex jcsbcentennt">
        <div>
          <span className="pageTitle">每日基础数据 </span>
          <span className="mr5"> 生成依据 </span>
          <span className="blueTip">2016年碳排放标准规范标准</span>
        </div>
        <button onClick={() => selectReport()}>查看报告</button>
      </div>
      <Modal
        title="选择报告"
        visible={checkBoxShow}
        onOk={() => {
          setcheckBoxShow(false);
          setPdfShow(true);
        }}
        onCancel={() => setcheckBoxShow(false)}
        cancelText="取消"
        okText="确定"
      >
        <div style={{margin:'0 0 40px 0'}}>
          <Checkbox.Group options={typeOptions} defaultValue={[]} />
        </div>
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      </Modal>

      <Modal
        title="预览"
        centered
        visible={pdfShow}
        width={1000}
        bodyStyle={{ height: "50vh", overflowY: "scroll" }}
        onOk={() => exportpdf()}
        onCancel={() => setPdfShow(false)}
      >
        <div id="demo">132</div>
      </Modal>
    </div>
  );
};
export default ExportPdf;
