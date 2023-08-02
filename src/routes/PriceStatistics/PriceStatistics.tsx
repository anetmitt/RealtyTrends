import { useContext, useEffect, useState } from "react";
import { JwtContext } from "../Root";
import { IStatisticFiltersData } from "../../dto/IStatisticFiltersData";
import { PriceStatisticsService } from "../../services/PriceStatisticsService";
import { IPriceStatisticsModel } from "../../models/IPriceStatisticsModel";
import StatisticFormView from "./StatisticsFormView";
//import { useHistory } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels,//.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
};


const PriceStatistics = () => {
  const priceStatisticsService = new PriceStatisticsService();
  const [validationErrors, setValidationErrors] = useState([] as string[]);

  const [formData, setFormData] = useState({
    TriggerName: "",
    CountySelect: "",
    ParishSelect: null,
    CitySelect: null,
    StreetSelect: null,
    TransactionType: "",
    PropertyType: "",
    RoomsCountMin: null,
    RoomsCountMax: null,
    PricePerUnitMax: null,
    PricePerUnitMin: null,
    AreaMin: null,
    AreaMax: null,
    StartDate: "",
    EndDate: ""
  } as IStatisticFiltersData);

  // Initialize chartData with the correct types
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
    }[];
  }>({
    labels: [
      'January',
    ],
    datasets: [
      {
        label: 'Price per unit',
        data: [],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgb(255,255,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)'
      },
    ],
  });

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // changes the color of the x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // changes the color of the x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: 'white', // changes the color of the y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // changes the color of the y-axis grid lines
        },
      },
    },
  };
  

  const handleChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    if (target.name === "startYear" || target.name === "startMonth" || target.name === "startDay") {
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  //const history = useHistory();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // console.log(await priceStatisticsService.GetStats(formData)); //Array of IGraphPoint
    const stats = await priceStatisticsService.GetStats(formData);
    console.log(stats);


    // Check if stats is actually an array before trying to map it
    if (Array.isArray(stats)) {
      const labels = stats.map((stat: any) => stat.SnapshotDate); // Replace 'any' with the actual type of stat
      const data = stats.map((stat: any) => stat.AveragePricePerUnit); // Replace 'any' with the actual type of stat

      setChartData(prevData => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
            borderColor: 'rgb(255,255,255,1)'          },
        ],
      }));
    } else {
      console.log('GetStats did not return an array');
    }

  };

  const { jwtResponse, setJwtResponse } = useContext(JwtContext);
  const [filterData, setFilterData] = useState({} as IPriceStatisticsModel);

  useEffect(() => {

    priceStatisticsService.fetchAll().then(
      response => {

        if (response) {
          setFilterData(response as IPriceStatisticsModel);
        } else {
          setFilterData({} as IPriceStatisticsModel);
        }
      }
    )

  }, [jwtResponse]);

  return (
    <>
      <h1 className="stat-header">Your Real Estate Price Statistic triggers</h1>
      <div className="trigger-filter-box">
        <div className="filters_container">
          <StatisticFormView values={formData} data={filterData} handleChange={handleChange} onSubmit={onSubmit} validationErrors={validationErrors} priceStatisticsService={priceStatisticsService}
            jwtToken={jwtResponse} />
        </div>
      </div>
      <div className="graph-container">
        <div className="graph-inner-box">
          <Line data={chartData} key={JSON.stringify(chartData)} />
        </div>
      </div>
    </>
  );
}

export default PriceStatistics;