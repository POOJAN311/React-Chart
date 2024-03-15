import { useEffect, useState } from 'react'
import axios from "axios";
import Chart from "react-apexcharts"
import './App.css'

function App() {
  const [ChartData, setChartData] = useState({})

  useEffect(() => {
    axios.get("https://checkinn.co/api/v1/int/requests")
      .then(res => {
        let seaside = 0;
        let urban = 0;
        let mountain = 0;
        let lakeside = 0;
        res.data.requests.map((item) => {
          if (item.hotel.id === 1) {
            seaside = seaside + 1;
          }
          else if (item.hotel.id === 2) {
            mountain = mountain + 1;
          }
          else if (item.hotel.id === 3) {
            urban = urban + 1;
          }
          else if (item.hotel.id === 5) {
            lakeside = lakeside + 1;
          }
        })
        const data = res.data.requests.map((id) => {
          let desks = [] = id.desk.name;
          return desks;
        })
        let UniqueDesk = [...new Set(data)]
        let Desks = UniqueDesk.join(", ")
        let TotalRequest = res.data.requests.length;
        setChartData({
          series: [{
            name: "Requests",
            data: [seaside, mountain, urban, lakeside]
          }],
          Desks,
          TotalRequest,
          options: {
            chart: {
              height: 300,
              type: 'line',
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false
              },
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Requests per Hotel',
              align: 'center'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ["Seaside Report", "Mountain View Inn", "Urban Retreat", "Lakeside BnB"],
            },
            yaxis: {
              min: 0,
              max: 8,
              tickAmount: 4,
            }
          },
        })
      })
  })
  return (
    <>
      <div id='container'>
        <div id='chart'>
          {ChartData && ChartData?.series && (
            <Chart
              options={ChartData.options}
              series={ChartData.series}
              type="line"
              width="700"
              height="350"
            />
          )}
        </div>
      </div>
      <h3>Total Request : {ChartData.TotalRequest}</h3>
      <p>List of unique department names across all Hotels: {ChartData.Desks}</p>
    </>
  )
}

export default App
