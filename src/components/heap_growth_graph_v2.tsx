import * as React from 'react';
import ReactEcharts from "echarts-for-react";

import BLeakResults from "../lib/results";
import { SnapshotSizeSummary } from "../common/interfaces";

const nleakResult = require("./test_data/result.json");
const BYTES_PER_MB = 1024 * 1024;

interface HeapGrowthGraphProps {
  bleakResults: BLeakResults;
}

const { heapStats } = nleakResult;
const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: heapStats.map((_, i) => `snapshot-${i+1}`)
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
	name: 'Round Trips Completed',
	nameLocation: 'middle',
	nameGap: 20,
    type: 'category',
    boundaryGap: false,
    data: heapStats.map((_, i) => `${i+1}`)
  },
  yAxis: {
	name: 'Live Heap Size',
	nameLocation: 'middle',
    nameGap: 50,
    type: 'value',
	axisLabel: {
		formatter: '{value} MB'
	}
  },
  series: [
    {
      name: 'Total Size',
      type: 'line',
      stack: 'Total',
      data: heapStats.map((h) => h.totalSize/ BYTES_PER_MB)
    }
  ]
};

class HeapGrowthGraphV2 extends React.Component<HeapGrowthGraphProps> {
  public componentWillMount() {
  }

  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public componentWillUnmount() {
  }

  public render() {
    return <div>
      <ReactEcharts option={option} />
    </div>
  }
}

export default HeapGrowthGraphV2;