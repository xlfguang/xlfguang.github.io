import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import ParkCard from "@components/ParkCard/ParkCard";
import TotalCount from "@components/TotalCount/TotalCount";
import Mymap from '@components/Mymap/Mymap';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  GET_PARK_CARBON_INFO_API,
  GET_PARK_STATISTICS_API,
  GET_PARK_TABLE_INFO_API,
} from "@request/apis";
import { useEffect, useState } from "react";
import { park_Info } from "types/types";


const ParkFootprint: NextPage = () => {
  const router = useRouter();
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
  const [testMiniCardList, setTestMiniCardList] = useState<MiniCardProps[]>([]);
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);

  const toInfo = (id: string | number) => {
    router.push(`/parkFootprint/info?id=${id}`);
  };

  const getID: () => string | boolean = () => {
    let id = (router.query.id as string | undefined) || "";
    if (id) {
      return id;
    }
    return false;
  };
  const getParkInfo = async () => {
    let id = getID();
    if (!id) {
      id = "1";
    }
    const getAllInfo = (id: number, type: number = 0) => {
      return Promise.all([
        GET_PARK_CARBON_INFO_API(id),
        GET_PARK_STATISTICS_API(id),
        GET_PARK_TABLE_INFO_API(id, type),
      ]);
    };
    const alliInfo = await getAllInfo(1, 1);
    const [carbonInfo, statisticsInfo, tableInfo] = alliInfo;
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

    // echarts 的折线图数据
    let xAxisData: string[] = [];
    let park_carbonEquivalent: string[] = [];
    let park_emissionLoadData: string[] = [];
    tableInfo.data.forEach((element) => {
      xAxisData.push(element.startTime);
      park_carbonEquivalent.push(element.carbonEquivalent);
      park_emissionLoadData.push(element.emissionLoad);
    });

    // 统一修改状态
    setparkInfo(carbonInfo.data);
    setTestMiniCardList([...statisticsInfoData]);
    setPark_xAxisData([...xAxisData]);
    setpark_carbonEquivalent([...park_carbonEquivalent]);
    setpark_emissionLoadData([...park_emissionLoadData]);
  };
  useEffect(() => {
    getParkInfo();
  }, []);

  return (
    <div className="parkFootprint">
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
      <div className="lineChartBox">
        <LineChart
          park_name={parkInfo.name}
          toDay_data={0}
          park_xAxisData={park_xAxisData}
          park_carbonEquivalent={park_carbonEquivalent}
          park_emissionLoad={park_emissionLoadData}
        ></LineChart>
      </div>
      <Mymap></Mymap>
      <div>
        {testMiniCardList.map((item, i) => {
          return (
            <MiniCard
              id={item.id}
              linkFun={()=>toInfo(item.id)}
              time={item.time}
              title={item.title}
              iconImg={item.iconImg}
              emissions={item.emissions}
              key={i.toString()}
            ></MiniCard>
          );
        })}
      </div>
      
    </div>
  );
};

export default ParkFootprint;
