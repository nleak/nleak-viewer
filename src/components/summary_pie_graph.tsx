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
  tooltip: {
    trigger: 'item'
  },
  dataset:{
	source:[
		['stack','1','2','3'],
		['Hidden Size'].concat(heapStats.map((h) => h.hiddenSize)),
		['Array Size'].concat(heapStats.map((h) => h.arraySize)),
		['Array Size'].concat(heapStats.map((h) => h.arraySize)), 
		['String Size'].concat(heapStats.map((h) => h.stringSize)),
		['Object Size'].concat(heapStats.map((h) => h.objectSize)), 
		['Code Size'].concat(heapStats.map((h) => h.codeSize)),
		['Closure Size'].concat(heapStats.map((h) => h.closureSize)), 
		['Regexp Size'].concat(heapStats.map((h) => h.regexpSize)), 
		['Heap Number Size'].concat(heapStats.map((h) => h.heapNumberSize)), 
		['Native Size'].concat(heapStats.map((h) => h.nativeSize)),
		['Synthetic Size'].concat(heapStats.map((h) => h.syntheticSize)), 
		['ConsString Size'].concat(heapStats.map((h) => h.consStringSize)),
		['Sliced String Size'].concat(heapStats.map((h) => h.slicedStringSize)),
		['Symbol Size'].concat(heapStats.map((h) => h.symbolSize)),
		['Unknown Size'].concat(heapStats.map((h) => h.unknownSize))
	]
  },
  series: [
	{
	  type: 'pie',
	  radius: '100%',
	  encode:{
		itemName:'stack',
		value: '3'
	  },
	  emphasis: {
		itemStyle: {
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowColor: 'rgba(0, 0, 0, 0.5)'
		  }
		}
	}
  ]
};

class SummaryPieGraph extends React.Component<HeapGrowthGraphProps> {
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

export default SummaryPieGraph;