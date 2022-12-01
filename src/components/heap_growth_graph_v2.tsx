import * as React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import BLeakResults from "../lib/results";
import { SnapshotSizeSummary } from "../common/interfaces";

interface HeapGrowthGraphProps {
  bleakResults: BLeakResults;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
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
    return <div>foo
      <Line data={data} options={options} />
    </div>
  }
}

export default HeapGrowthGraphV2;