import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { valuesSelector } from '../../store/ValuesSlice';
import { OptionModel } from '../../models/OptionModel';
import { useEffect, useRef, useState } from 'react';
import './BarChart.css';
import React from 'react';

registerables && Chart.register(...registerables);
const BarChart = () => {
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const { question, options } = useSelector(valuesSelector);
  const trimText = (text: string) => {
    if (text?.length > 20) {
      return text.substring(1, 20) + '...';
    } else return text;
  };
  const data = {
    labels: options?.map((v: OptionModel) => trimText(v.text)),
    datasets: [
      {
        backgroundColor: 'lightgray',
        borderColor: 'darkgray',
        borderWidth: 1,
        data: options?.map((v: OptionModel) => v.voteCount),
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: false,
        // text: 'What is the value of π?',
      },
      legend: {
        display: false,
      },
    },
    scale: {
      ticks: {
        precision: 0,
      },
      xAxes: [
        {
          categorySpacing: 0,
        },
      ],
    },
  };
  useEffect(() => {
    let total = 0;
    if (options?.length > 0) {
      options.map((o: OptionModel) => {
        total += o.voteCount;
        setTotalVotes(total);
      });
    } else {
      setTotalVotes(total);
    }
  }, [options]);
  return question && options?.length >= 2 ? (
    <>
      <div className='bar-chart-page'>
        <div className='graph'>
          <div>
            <h2>{question}</h2>
          </div>
          {data && <Bar data={data} options={chartOptions} />}
        </div>
        <div>Total Votes: {totalVotes}</div>
      </div>
    </>
  ) : (
    <div className='no-data'>No data found</div>
  );
};
export default BarChart;
