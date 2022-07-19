import InfoTable from "@components/InfoTable/InfoTable";
import ParkCard, { ParkCardData } from "@components/ParkCard/ParkCard";
import TotalCount, { TotalCountData } from "@components/TotalCount/TotalCount";
import { ColumnsType } from "antd/lib/table";
import type { NextPage } from "next";
import { overviewData, park_Info } from "types/types";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";
import Router from "next/router";
import {
  GET_ENTERPRISE_CARBON_INFO_API,
  GET_ENTERPRISE_CARBON_LIST_API,
  GET_PARK_CARBON_INFO_API,
} from "@request/apis";
import { useEffect, useState } from "react";
import { info } from "console";

const columns: ColumnsType<overviewData> = [
  {
    title: "企业ID",
    dataIndex: "enterpriseID",
    key: "enterpriseID",
    render: (item: overviewData["enterpriseID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "企业类型",
    dataIndex: "enterpriseType",
    key: "enterpriseType",
  },
  {
    title: "统计时间",
    dataIndex: "statisticsTime",
    key: "statisticsTime",

    render: (item: overviewData["statisticsTime"]) => {
      return (
        <div>
          <img src="/images/icon-time.png" alt="" />
          <span> {item}</span>
        </div>
      );
    },
  },
  {
    title: "碳排放量",
    dataIndex: "emissions",
    key: "emissions",
    render: (emissions) => {
      return (
        <div>
          <span>{emissions} </span>
          <div className="goldenlabel">kgCO2e</div>
        </div>
      );
    },
    sorter: (a, b) => Number(a.emissions) - Number(b.emissions),
    showSorterTooltip: false,
  },
  {
    title: "查看",
    dataIndex: "",
    key: "x",
    render: () =>
      CheckDetailsBTN({
        btnClickFun: () => {
          Router.push("/enterpriseFootprint/info");
        },
        btnText: "查看详情",
      }),
  },
];
/**
 * 数据
 * */
const data: overviewData[] = [
  {
    key: "1",
    enterpriseID: {
      title: "绵阳佳美建筑装饰材料科技有限公司",
      subtitle: "D区10号A-101",
    },
    enterpriseType: "工业与建筑",
    statisticsTime: "2020/05/22",
    emissions: 86.32,
  },
];
type info = ParkCardData & TotalCountData;
const EnterpriseFootprint: NextPage = () => {
  const [parkInfo, setparkInfo] = useState<park_Info["data"]>({
    id: 0,
    name: "暂无信息",
    area: "",
    num: 0,
    address: "暂无信息",
    emissionLoad: "0",
    region: "暂无信息",
    type: "暂无信息",
    reduce: "0.00",
  });
  const [tableData, setTableData] = useState<overviewData[]>([]);
  const getAllInfo = async () => {
    const postList = (id: number = 1) => {
      return Promise.all([
        GET_PARK_CARBON_INFO_API(id),
        GET_ENTERPRISE_CARBON_LIST_API(id),
      ]);
    };
    let res = await postList(1);
    const [parkInfo, enterpriseInfo] = res;
    setparkInfo(parkInfo.data);
    const tableData = enterpriseInfo.data.data.map((item, i) => {
      return {
        key: i.toString(),
        enterpriseID: {
          title: item.name,
          subtitle: item.address,
        },
        enterpriseType: item.type,
        statisticsTime: item.startTime,
        emissions: item.emissionLoad,
      };
    });
    setTableData([...tableData]);
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <div className="enterpriseFootprint">
      <div className="topCardBox">
        <div className="parkcard-box">
          <ParkCard
            parkName={parkInfo.name}
            parkLoc={parkInfo.address}
            parktype={parkInfo.type}
            parknum={parkInfo.num}
            area={parkInfo.area}
          />
        </div>
        <div className="TotalCount-box">
          <TotalCount
            total={parkInfo.emissionLoad}
            addOrsub={false}
            deviation={parkInfo.reduce}
          />
        </div>
      </div>

      <div className="infoTable-box">
        <InfoTable columns={columns} data={tableData}></InfoTable>
      </div>
    </div>
  );
};

export default EnterpriseFootprint;
