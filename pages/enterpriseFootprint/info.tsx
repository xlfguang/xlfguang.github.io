import { InfoCardData } from "@components/InfoCard/InfoCard";
import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import ParkCard from "@components/ParkCard/ParkCard";
import TotalCount from "@components/TotalCount/TotalCount";
import {
  GET_ENTERPRISE_CARBON_DAY_BASE_API,
  GET_ENTERPRISE_CARBON_ECHARTS_DATA_API,
  GET_ENTERPRISE_CARBON_INFO_API,
} from "@request/apis";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { company_Info } from "types/types";

const EnterpriseFootprintInfo: NextPage = () => {
  const router = useRouter();
  const toInfo = () => {
    router.push(`/enterpriseFootprint/details`);
  };

  /**公司详情*/
  const [companyDetails, setCompanyDetails] = useState<company_Info["data"]>({
    address: "暂无信息",
    create_time: "暂无信息",
    emissionLoad: "暂无信息",
    id: 2,
    name: "暂无信息",
    reduce: "暂无信息",
    type: "暂无信息",
  });
  /**卡片列表*/
  const [miniCardList, setMiniCardList] = useState<MiniCardProps[]>([]);
  /**echarts 折线图数据*/
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);

  const getAllInfo = async () => {
    const getAllInfoQuery = (id: number) => {
      return Promise.all([
        GET_ENTERPRISE_CARBON_INFO_API(2),
        GET_ENTERPRISE_CARBON_ECHARTS_DATA_API(2, 1),
        GET_ENTERPRISE_CARBON_DAY_BASE_API(1),
      ]);
    };
    let res = await getAllInfoQuery(2);
    const [companyDetails, echartsData, statisticsInfo] = res;
    setCompanyDetails(companyDetails.data);

    // echarts 的折线图数据
    let xAxisData: string[] = [];
    let park_carbonEquivalent: string[] = [];
    let park_emissionLoadData: string[] = [];
    echartsData.data.forEach((element) => {
      xAxisData.push(element.startTime);
      park_carbonEquivalent.push(element.carbonEquivalent);
      park_emissionLoadData.push(element.emissionLoad);
    });

    setPark_xAxisData([...xAxisData]);
    setpark_carbonEquivalent([...park_carbonEquivalent]);
    setpark_emissionLoadData([...park_emissionLoadData]);

    // 处理数据
    const statisticsInfoData = statisticsInfo.data.map((item) => {
      return {
        id: item.id,
        title: item.name,
        emissions: item.emissionLoad,
        time: item.startTime,
        iconImg: "/images/Group.png",
      };
    });

    setMiniCardList([...statisticsInfoData]);
  };
  useEffect(() => {
    getAllInfo();
  }, []);
  return (
    <div className="parkFootprint">
      <div className="m24">
        <div className="blueTip">
          <Link href="/enterpriseFootprint"> 返回 企业碳足迹</Link>
        </div>
      </div>

      <div className="topCardBox">
        <div className="parkcard-box">
          <ParkCard
            parkName={companyDetails.name}
            parkLoc={companyDetails.address}
            parktype={companyDetails.type}
            parknum={512}
            area={12.89}
          />
        </div>
        <div className="TotalCount-box">
          <TotalCount
            total={companyDetails.emissionLoad}
            addOrsub={false}
            deviation={companyDetails.reduce}
          />
        </div>
      </div>

      <div className="lineChartBox">
        <LineChart
          park_name={""}
          toDay_data={0}
          park_xAxisData={park_xAxisData}
          park_carbonEquivalent={park_carbonEquivalent}
          park_emissionLoad={park_emissionLoadData}
        ></LineChart>
      </div>

      <div>
        {miniCardList.map((item, i) => {
          return (
            <MiniCard
              linkFun={toInfo}
              time={item.time}
              title={item.title}
              iconImg={item.iconImg}
              emissions={item.emissions}
              key={i.toString()}
              id={item.id}
            ></MiniCard>
          );
        })}
      </div>
    </div>
  );
};

export default EnterpriseFootprintInfo;
