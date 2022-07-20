import type { NextPage } from "next";
import Link from "next/link";
import InfoCard, { InfoCardData } from "@components/InfoCard/InfoCard";
import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import TableModal from "@components/TableModal/TableModal";
import { useContext, useEffect, useState } from "react";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";
import { ColumnsType } from "antd/lib/table";
import { detailsTable } from "types/types";
import { useRouter } from "next/router";
import {
  GET_PARK_ACTIVITY_INFO_API,
  GET_PARK_ACTIVITY_DAY_BASE_API,
  GET_PARK_ACTIVITY_ECHARTS_DATA_API,
  GET_PARK_ACTIVITY_DAY_BASE_DETAIL_API,
} from "@request/apis";
import { MyContext } from "@components/MyContext/MyContext";

const columns: ColumnsType<detailsTable> = [
  {
    title: "设备ID",
    dataIndex: "deviceID",
    key: "deviceID",
    render: (item: detailsTable["deviceID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "企业ID",
    dataIndex: "enterpriseID",
    key: "enterpriseID",
    render: (item: detailsTable["enterpriseID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "服务对象企业ID",
    dataIndex: "serviceenterpriseID",
    key: "serviceenterpriseID",
    render: (item: detailsTable["serviceenterpriseID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "行为",
    dataIndex: "behavior",
    key: "behavior",
  },
  {
    title: "开始和结束时间",
    dataIndex: "startAndEndTime",
    key: "startAndEndTime",
  },
  {
    title: "排放气体",
    dataIndex: "exhaustGas",
    key: "exhaustGas",
  },
  {
    title: "排放量",
    dataIndex: "emissions",
    key: "emissions",
  },
  {
    title: "排放碳当量",
    dataIndex: "carbonEmissions",
    key: "carbonEmissions",
  },
];

const ParkFootprintInfo: NextPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId, typeId } = state;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalShow, setmodalShow] = useState(false);
  const [avtiveInfo, setActiveInfo] = useState<InfoCardData>({
    name: "暂无信息",
    loc: "暂无信息",
    addOrSub: false,
    total: 0,
    deviation: "",
  });
  const [testMiniCardList, setTestMiniCardList] = useState<MiniCardProps[]>([]);
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);
  const [tableData, setTableData] = useState<detailsTable[]>([]);

  const getParkInfo = async () => {
    const getAllInfo = (
      id: number = parkId,
      activityId: string = typeId,
      type: number = 0
    ) => {
      return Promise.all([
        GET_PARK_ACTIVITY_INFO_API(id, activityId),
        GET_PARK_ACTIVITY_DAY_BASE_API(id, activityId),
        GET_PARK_ACTIVITY_ECHARTS_DATA_API(id, activityId, type),
      ]);
    };
    let alliInfo = await getAllInfo();
    const [carbonInfo, statisticsInfo, tableInfo] = alliInfo;
    // 处理卡片列表的数据
    const statisticsInfoData = statisticsInfo.data.map((item) => {
      return {
        id: item.id,
        title: item.name,
        emissions: item.emissionLoad,
        time: item.startTime,
        iconImg: "/images/Group.png",
        appendButto: CheckDetailsBTN({
          btnClickFun: () => checkDetails(item.id),
          btnText: "查看详情",
        }),
      };
    });
    // echarts 的折线图数据
    let xAxisData: string[] = [];
    let park_carbonEquivalent: string[] = [];
    let park_emissionLoadData: string[] = [];
    tableInfo.data.forEach((element) => {
      xAxisData.push(element.startTime);
      park_carbonEquivalent.push(element.carbonEquivalent);
      park_emissionLoadData.push(element.emissionLoad);
    });

    setTestMiniCardList([...statisticsInfoData]);
    setPark_xAxisData([...xAxisData]);
    setpark_carbonEquivalent([...park_carbonEquivalent]);
    setpark_emissionLoadData([...park_emissionLoadData]);
  };

  useEffect(() => {
    console.log(state.typeId);

    getParkInfo();
  }, []);

  const checkDetails = async (id: number) => {
    console.log(id);
    let res = await GET_PARK_ACTIVITY_DAY_BASE_DETAIL_API(
      1,
      id,
      pageIndex,
      pageSize
    );
    let tableData: detailsTable[] = res.data.data.map((item, i) => {
      return {
        key: i.toString(),
        deviceID: {
          title: item.equipmentNo,
          subtitle: item.behavior,
        },
        enterpriseID: {
          title: item.serveName,
          subtitle: item.address,
        },
        serviceenterpriseID: {
          title: item.name,
          subtitle: item.address,
        },
        behavior: "车辆运行",
        startAndEndTime: "2022/05/22 14:12 - 16:32",
        exhaustGas: "CO2",
        emissions: item.emissionLoad,
        carbonEmissions: item.carbonEquivalent,
      };
    });
    setTableData([...tableData]);
    setmodalShow(true);
  };

  return (
    <div className="main ">
      <div className="m24">
        <div className="blueTip">
          <Link href="/parkFootprint"> 返回 园区碳足迹</Link>
        </div>
      </div>
      <div className="mt24">
        <InfoCard
          name={avtiveInfo.name}
          loc={avtiveInfo.loc}
          addOrSub={avtiveInfo.addOrSub}
          total={avtiveInfo.total}
          deviation={avtiveInfo.deviation}
        ></InfoCard>
      </div>

      <div className="lineChartBox">
        <LineChart
          park_name={"交通用能碳足迹"}
          toDay_data={0}
          park_xAxisData={park_xAxisData}
          park_carbonEquivalent={park_carbonEquivalent}
          park_emissionLoad={park_emissionLoadData}
        ></LineChart>
      </div>
      <div className="m24">
        <span className="pageTitle">每日基础数据 </span>
        <span className="mr5"> 生成依据 </span>
        <span className="blueTip">2016年碳排放标准规范标准</span>
      </div>
      <div>
        {testMiniCardList.map((item, i) => {
          return (
            <MiniCard
              id={item.id}
              appendButto={item.appendButto}
              time={item.time}
              title={item.title}
              iconImg={item.iconImg}
              emissions={item.emissions}
              key={i.toString()}
            ></MiniCard>
          );
        })}
      </div>
      <TableModal
        show={modalShow}
        onCancel={() => setmodalShow(false)}
        columns={columns}
        data={tableData}
      ></TableModal>
    </div>
  );
};
export default ParkFootprintInfo;
