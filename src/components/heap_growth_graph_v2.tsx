import * as React from 'react';
import ReactEcharts from "echarts-for-react";

import BLeakResults from "../lib/results";
import { SnapshotSizeSummary } from "../common/interfaces";

const nleakResult = require("./test_data/result.json");

interface HeapGrowthGraphProps {
  bleakResults: BLeakResults;
}

const { heapStats } = nleakResult;
const option = {
  title: {
    text: 'Stacked Line'
  },
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
    type: 'category',
    boundaryGap: false,
    data: heapStats.map((_, i) => `snapshot-${i+1}`)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Total Size',
      type: 'line',
      stack: 'Total',
      data: heapStats.map((h) => h.totalSize)
    },
    {
      name: 'Nodes Num',
      type: 'line',
      stack: 'Total',
      data: heapStats.map((h) => h.numNodes)
    },
    {
      name: 'Edges Num',
      type: 'line',
      stack: 'Total',
      data: heapStats.map((h) => h.numEdges)
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