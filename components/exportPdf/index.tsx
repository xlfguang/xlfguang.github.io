import exportPDF from "@public/exportPDF";
import { Modal, Checkbox, Space, DatePicker } from "antd";
import { useState } from "react";
import styles from "./index.module.sass";
let prakInfo = {
  id: 0,
  name: "成都园区",
  area: "58000",
  num: 0,
  address: "成都市高新区",
  emissionLoad: "",
  region: "",
  type: "工业园区",
  reduce: "",
};
let parkStatistics = [
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
];
let detailsList = [
  {
    name: "工业用能排放",
    list: [
      {
        detailsName: "国网电",
        num: "1189232",
        emissionLoad: "0.581",
        carbonEquivalent: "690943.792",
      },
      {
        detailsName: "水电",
        num: "1189232",
        emissionLoad: "0.581",
        carbonEquivalent: "690943.792",
      },
      {
        detailsName: "风电",
        num: "1189232",
        emissionLoad: "0.581",
        carbonEquivalent: "690943.792",
      },
      {
        detailsName: "火电",
        num: "1189232",
        emissionLoad: "0.581",
        carbonEquivalent: "690943.792",
      },
    ],
  },
];

const ExportPdf = ({ typeOptions }: { typeOptions: any }) => {
  const { RangePicker } = DatePicker;
  const [checkBoxShow, setcheckBoxShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const exportpdf = () => {
    let name = "";
    let domName = "pdfDOM";
    exportPDF(name, domName);
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
        <div style={{ margin: "0 0 40px 0" }}>
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
        okText="导出"
        cancelText="取消"
      >
        <div id="pdfDOM">
          <div className={styles.pdfBox}>
            <div className={styles.title}>基本信息</div>
            <div className={styles.infoBox}>
              <span>园区/企业名称 </span>
              <span>{prakInfo.name}</span>
            </div>
            <div className={styles.infoBox}>
              <span>类型</span>
              <span>{prakInfo.type}</span>
            </div>
            <div className={styles.infoBox}>
              <span>年份</span>
              <span>{prakInfo.emissionLoad}</span>
            </div>
            <div className={styles.infoBox}>
              <span>地址</span>
              <span>{prakInfo.address}</span>
            </div>
            <div className={styles.title}>排放信息</div>
            {parkStatistics.map((item, index: number) => {
              return (
                <div className={styles.infoBox} key={index}>
                  <span>{item.name}</span>
                  <span>{item.emissionLoad}</span>
                </div>
              );
            })}
            <div className={styles.title}>明细</div>
            <div className={styles.details}>
              <span></span>
              <span className={styles.name}>能源名称</span>
              <span>消费量（KWH）</span>
              <span>CO2排放因子 （kgCO2/KWH）</span>
              <span>CO2排放量（kg）</span>
            </div>
            {/* <div className={styles.details}>
              {detailsList.map((item, index) => {
                return (
                  <div key={index}>
                    <span>{item.name}</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ExportPdf;
