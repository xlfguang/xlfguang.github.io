import * as echarts from "echarts";
import { ComposeOption } from "echarts/core";
import { useEffect, useRef } from "react";
import {
  SeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts";
import { MapSeriesOption } from "echarts/types/dist/shared";
import sicuanData from "./sicuan.json";
import { mark_List } from "@pages/index";
import router from "next/router";

type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | MapSeriesOption
  | SeriesOption
  | TooltipComponentOption
>;

const MapChart = ({ markList }: { markList: mark_List }) => {
  const chartRef: any = useRef(null);
  let myChart: echarts.ECharts | null | void = null;
  const options: ECOption = {
    backgroundColor: "rgba(0,0,0,0)",

    geo: {
      map: "sicuan",
      type: "map",
      geoIndex: 1,
      zoom: 1.0, //地图的比例
      label: {
        show: true,
        position: "top",
        distance: 10,
        textStyle: {
          color: "#FFF", //字体颜色
        },
      },
      itemStyle: {
        areaColor: "rgba(221, 238, 223, 0.5)",
        borderColor: "#639180",
        emphasis: {
          areaColor: "rgba(216, 241, 220, 0.8)",
        },
      },
    },
    series: [
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: {
          //涟漪特效
          number: 0, //涟漪的最大值
        },
        symbol: "image:///images/mark.png",
        symbolSize: [30, 52],
        data: markList,
      },
    ],

    tooltip: {
      show: true,
      backgroundColor: "#E3EEEA",
      formatter: function (params: any) {
        let tipDom = "";
        tipDom = `<div>
        <img src='/images/Vector-6.png'/>
        <span style="font-size: 16px;color: #000;">${params.name}</span>
        <br/>
        <span>
          <span style="font-size: 12px;color: #778399;">碳排放量</span>
          <span style="font-size: 16px;color: #052835;">${params.value[2]}</span>
          <span style="background: #F6CD7D; border-radius: 37px;padding: 2px 6px; font-size: 12px;">kgCO2e</span>
        </span>
        </div>`;
        return tipDom;
      },
    },
  };

  async function renderChart() {
    myChart = echarts.init(document.getElementById("Map") as HTMLDivElement);
    let data: any = sicuanData;
    echarts.registerMap("sicuan", data);
    (myChart as any).setOption(options);
    myChart.on("click", function (params: any) {
      if (params.componentType === "series") {
        router.push(`/parkFootprint?id=${params.data.id}`);
      }
    });
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0, //第几条series
      dataIndex: 1, //显示第几个tooltip
    });
  }

  function again() {
    return (myChart as echarts.ECharts).resize();
  }

  function debounce(fn: () => void, wait: number | undefined) {
    let timer: string | number | NodeJS.Timeout | null | undefined = null;
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, wait);
    };
  }

  function onresize() {
    window.addEventListener("resize", debounce(again, 500));
  }

  useEffect(() => {
    renderChart();
    onresize();
    return () => {
      myChart && myChart.dispose();
    };
  }, [markList]);

  return (
    <div className="mapChart" style={{ textAlign: "center" }}>
      <div
        id="Map"
        ref={chartRef}
        style={{ height: "100vh", width: "100%" }}
      ></div>
    </div>
  );
};

export default MapChart;
