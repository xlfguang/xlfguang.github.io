import type { NextPage } from "next";
import * as echarts from "echarts";
import { ComposeOption } from "echarts/core";
import { useEffect, useRef } from "react";
import style from "./LineBarChart.module.sass";
import {
  TitleComponentOption,
  TooltipComponentOption,
  LineSeriesOption,
  GridComponentOption,
} from "echarts";
import { XAXisOption, YAXisOption } from "echarts/types/dist/shared";
type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | XAXisOption
  | YAXisOption
  | LineSeriesOption
  | GridComponentOption
>;
type LineBarChartPorps = {
  park_name: string;
  park_color: string;
  toDay: string;
  toDay_data: number | string;
  park_xAxisData: string[];
  park_seriesData: string[];
};

const LineBarChart: NextPage<LineBarChartPorps> = (
  porps: LineBarChartPorps
) => {
  const {
    park_name,
    park_color,
    toDay,
    toDay_data,
    park_xAxisData,
    park_seriesData,
  } = porps;
  const chartRef: any = useRef(null);
  let myChart: echarts.ECharts | null = null;
  const options: ECOption = {
    grid: {
      top: "15%",
      left: "0%",
      right: "0%",
      bottom: "5%",
    },
    title: {
      show: false,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: park_xAxisData,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: park_seriesData,
        type: "line",
        smooth: true,
        markPoint: {
          data: [
            {
              name: "",
              coord: [park_xAxisData[0], park_seriesData[0]],
            },
          ],
          symbol: "circle",
          symbolSize: 15, // 标记图形的大小
          itemStyle: {
            color: "#fff", // 标注点颜色
            borderType: "solid",
            borderWidth: 3,
            borderColor: park_color,
          },
          label: {
            show: false,
          },
        },
      },
    ],
  };
  function renderChart() {
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      myChart = chart;
    } else {
      myChart = echarts.init(chartRef.current);
    }
    myChart.setOption(options);
  }
  useEffect(() => {
    renderChart();
    return () => {
      myChart && myChart.dispose();
    };
  }, []);

  return (
    <div className={style.lineBarChartBox} style={{ textAlign: "center" }}>
      <div className={style.parkName}>{park_name}</div>
      <div className="flex">
        <div ref={chartRef} style={{ height: "70px", width: "380px" }}></div>
        <div className={style.todayTotal}>
          <div className="toDay colorfff">{toDay}</div>
          <div className={style.toDayData}>
            {toDay_data}
            <span className={style.units}>kgCO2e</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineBarChart;
