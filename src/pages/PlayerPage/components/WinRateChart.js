import React from "react";
import { floatToPercentageString } from "../../../utils/utils";
import ReactEcharts from "echarts-for-react";

export default function WinRateChart({ winsArray }) {
  const option = {
    grid: { top: 30, right: 30, bottom: 50, left: 50 },
    textStyle: {
      color: "white",
    },
    tooltip: {
      trigger: "axis",
      valueFormatter: floatToPercentageString,
    },
    xAxis: {
      type: "category",
      data: winsArray.map((n, i) => i + 1),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: floatToPercentageString,
      },
    },
    series: [
      {
        data: winsArray.map((n, i) => n / (i + 1)),
        type: "line",
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "100%" }} id="chart">
      <p style={{ fontSize: 20, marginTop: 20, marginLeft: 20 }}>
        Win rate graph
      </p>
      <ReactEcharts option={option} style={{ width: "100%", height: "90%" }} />
    </div>
  );
}
