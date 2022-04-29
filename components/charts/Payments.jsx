import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })
import React, { useEffect, useState } from "react"
export default function Stats(props) {
  const [loaded, setLoaded] = useState(true)

  const state = {
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        zoom: {
          autoScaleYaxis: true,
        },
      },
      tooltip: {
        theme: "light",
        enabled: true,
        x: {
          show: true,
          format: "HH:mm:ss",
          formatter: undefined,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0c14d4"],
      markers: {
        size: 0,
      },
      stroke: {
        width: 4.5,
      },
      yaxis: {
        title: {
          text: "GLM",
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "12px",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm:ss",
          },
        },
        title: {
          text: "UTC Time",
          offsetX: 0,
          offsetY: 5,
          style: {
            color: undefined,
            fontSize: "12px",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
      },
    },
  }

  return loaded == true ? (
    <div data-aos="fade-up" data-aos-duration="1000">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className=" bg-white col-span-12 shadow-xl rounded-lg p-8">
          <div className="relative">
            <h1 className=" mb-2 font-semibold text-2xl">{props.title}</h1>
            <div className="d-flex align-items-center">
              <dt>
                <div className="absolute bg-golemblue rounded-md p-3"></div>
              </dt>
              <dd className="ml-16 pb-6 sm:pb-7">
                <div className="relative">
                  <p className="text-2xl font-semibold text-gray-900 ">
                    {props.spent} {props.currency}
                  </p>
                  <p className="text-sm font-medium text-green-500 truncate">Spent total</p>
                </div>
              </dd>
            </div>
          </div>
          <div id="chart">
            <Chart options={state.options} series={props.data} type="line" height={200} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>loading</p>
  )
}
