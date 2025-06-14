import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import ReactEcharts from "echarts-for-react";

const GamesGraph = ({ stats }) => {
  const theme = useTheme();
  const { gamesPerMonth } = stats;
  const months = Object.keys(gamesPerMonth).map((date) => {
    const [year, month] = date.split("-");
    return `${year}-${month}`;
  });

  const numbers = Object.values(gamesPerMonth);

  const option = {
    textStyle: {
      color: theme.palette.text.primary,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Games played",
        type: "bar",
        data: numbers,
        itemStyle: {
          color: theme.palette.primary.light,
          borderRadius: [20, 20, 0, 0],
        },
      },
    ],
    grid: {
      containLabel: true,
      top: 20,
      right: 5,
      bottom: 0,
      left: 5,
    },
  };
  return (
    <Box className="mainsection-panel mainsection-graph-panel">
      <Typography variant="h6" fontWeight={500}>
        Games played per month
      </Typography>
      <ReactEcharts
        option={option}
        style={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default GamesGraph;
