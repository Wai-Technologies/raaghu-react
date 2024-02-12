const code_snippet = [
  {
    line: ` <RdsLineChart
    id="multilinechart"
    height={250}
    width={650}
    labels={["January", "February", "March", "April", "May", "Jun", "July"]}
    options={{
      pointStyle: "circle",
      radius: 4,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          position: "top",
          align: "center",
          pointStyle: "bottom",
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          usePointStyle: true,
        },
        filler: {
          propagate: false,
        },
        title: {
          display: true,
          text: "Multi-Line Chart",
        },
      },
      interaction: {
        intersect: false,
      },
    }}
    dataSets={[
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192,0.7)",
        tension: 0.1,
        backgroundColor: "rgb(75, 192, 192,0.2)",
      },
      {
        label: "Dataset 2",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "rgb(192, 75, 192,0.7)",
        tension: 0.1,
        backgroundColor: "rgb(192, 75, 192,0.2)",
      },
      {
        label: "Dataset 3",
        data: [15, 29, 60, 41, 66, 35, 70],
        fill: false,
        borderColor: "rgb(192, 192, 75,0.7)",
        tension: 0.1,
        backgroundColor: "rgb(192, 192, 75,0.2)",
      },
    ]}
  />`,
    name: "Line Chart",
  },
  {
    pie: `   <RdsPieChart
    id="piechartpa"
    height={300}
    width={200}
    labels={['red', 'Orange', 'Yellow', 'Green', 'Blue']}
    options={{
      circumference: 360,
      radius: 100,
      maintainAspectRatio:false,
      animation: {
        animateRotate: false,
        animateScale: true
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          pointStyle: "line",
    
          labels: {
    
            usePointStyle: true
          }
        },
        title: {
          display: true,
          text: 'Pie Chart'
        }
      }
    }}
    dataSets={[
      {
        label: 'Dataset1',
        data: [20, 10, 20, 40, 10],
        backgroundColor: [
          '#ff6384',
          '#ff9f40',
          '#ffcd56',
          '#4bc0c0',
          '#059bff',
        ],
        borderColor: [
          '#fff',
        ],
        borderWidth: 1
      }
    ]}
  />`,
    name: "Pie Chart",
  },
  {
    bar: `  <RdsBarChart
    id="barchartpa"
    height={400}
    width={650}
    labels={["January", "February", "March", "April", "May", "June", "July"]}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Vertical Bar Chart",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    }}
    dataSets={[
      {
        label: "Dataset 1",
        data: [20, 30, 50, 80, 98, 95, 55],
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderRadius: 20,
      },
      {
        label: "Dataset 2",
        data: [15, 67, 34, 78, 45, 87, 76],
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderRadius: 20,
      },
      {
        label: "Dataset 3",
        data: [31, 52, 43, 91, 74, 93, 76],
        backgroundColor: "rgba(255, 159, 64, 1)",
        borderRadius: 20,
      },
    ]}
  />`,
    name: "Bar Chart",
  },
  {
    boolean: `<RdsBooleanChart
    id="barcfgdhartpa"
    height={200}
    width={200}
    labels={["green", "grey"]}
    options={{
      maintainAspectRatio: false,
      elements: {
        center: {
          text: "50%", //set as you wish
        },
      },
      cutoutPercentage: 75,
      legend: {
        display: false,
      },
      responsive: true,
      plugins: {
        series: {
          label: {
            position: "inside",
            text: "total", // or "inside" | "outside"
            display: false,
          },
        },
        doughnutlabel: {
          labels: [
            {
              text: "550",
              font: {
                size: 20,
                weight: "bold",
              },
            },
            {
              text: "total",
            },
          ],
        },

        legend: {
          display: false,
          align: "center",
          position: "top",
        },
      },
    }}
    centerIconName="users"
    dataSets={[
      {
        label: "Dataset 1",
        data: [20, 10],
        fillStyle: "blue",
        fillRect: [200, 100, 40, 10],
        backgroundColor: ["#7E2EEF", "#BF00BB"],
        borderColor: ["#fff"],
        borderWidth: 1,
        cutout: "90%",
        title: {
          text: "Doughnut Chart",
          verticalAlign: "center",
          dockInsidePlotArea: true,
        },
      },
    ]}
  />`,
    name: "Boolean Chart",
  },
  {
    area: ` <RdsAreaChart
    id="areachartpa"
    height={300}
    width={300}
    labels={[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]}
    options={{
      radius: 0,
      pointStyle: "circle",
      responsive: true,
      borderWidth: 2,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
        },
        legend: {
          position: "top",
          align: "end",
          pointStyle: "circle",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 30,
            height: 10,
          },
        },
        tooltip: { enabled: true },
      },
      scales: {
        y: {
          beginAtZero: true,
          legend: {
            labels: {
              maxheight: 10,
            },
          },
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      tooltip: {
        display: true,
        usePointStyle: true,
      },
    }}
    dataSets={[
      {
        label: "Sales",
        data: [
          600, 462, 405, 362, 350, 350.5, 320.8, 318, 605, 689, 352, 354,
        ],
        borderColor: "#4DCFFF",
        pointBackgroundColor: "#4DCFFF",
        backgroundColor: "--chart-line-color1",
        fill: true,
        pointRadius: 3,
        // fillColor: "rgba(195, 40, 96, 0.1)",
        tension: 0.4,
      },
      {
        label: "Revenue",
        data: [
          250, 780.2, 780.4, 650, 455, 455.5, 455.8, 456, 610, 455, 250, 254,
        ],
        borderColor: "#863BFF",
        pointBackgroundColor: "#863BFF",
        backgroundColor: "--chart-line-color2",
        fill: true,
        pointRadius: 3,
        tension: 0.4,
      },
    ]}
    isGradient={true}
  />`,
    name: "Area Chart",
  },
  {
    bubble: ` <RdsBubbleChart
    id="bubblechart"
    labels={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
    options={{
      responsive: true,
      radius: 5, // smaller bubbles
      maintainAspectRatio: false,
      pointStyle: 'circle',
      plugins: {
        legend: {
          position: 'top',
          pointStyle: 'line',
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          usePointStyle: true,
        },
        title: {
          display: true,
          text: 'Bubble Chart',
        },
      },
    }}
    dataSets={[
      {
        label: 'Dataset 1',
        data: [90, 97, 20, 30, 40, 50, 60, 70],
        borderColor: ['red'],
        backgroundColor: ['rgba(255, 99, 132)'],
      },
      {
        label: 'Dataset 2',
        data: [90, 80, 70, 60, 50, 40, 30, 90, 98],
        borderColor: ['orange'],
        backgroundColor: ['rgba(255, 206, 86)'],
      },
    ]}
  />`,
    name: "Bubble Chart",
  },
  {
    stacked: ` <RdsStackedChart
    id="stackedc"
    height={300}
    width={300}
    labels={[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]}
    options={{
      animation: {
        x: {
          easing: "linear",
          duration: 3000,
          from: 0,
        },
        y: {
          easing: "linear",
          duration: 3000,
          from: 200,
        },
      },
      radius: 3,
      responsive: true,
      maintainAspectRatio: false,
      pointStyle: "triangle",
      plugins: {
        title: {
          display: true,
          // "text": "Chart.js Line Chart - stacked"
        },
        tooltip: {
          mode: "index",
        },
        legend: {
          position: "top",
          align: "center",
          pointStyle: "circle",
          labels: {
            usePointStyle: true,
          },
          tooltip: {
            usePointStyle: true,
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          axis: "x",
          title: {
            display: true,
            text: "Month",
            padding: {
              top: 4,
              bottom: 4,
            },
            color: "#666",
          },
          type: "category",
          ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: false,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2,
            color: "#666",
          },
          display: true,
          offset: false,
          reverse: false,
          beginAtZero: false,
          bounds: "ticks",
          grace: 0,
          grid: {
            display: true,
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            offset: false,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1,
            color: "rgba(0,0,0,0.1)",
            borderColor: "rgba(0,0,0,0.1)",
          },
          id: "x",
          position: "bottom",
        },
        y: {
          axis: "y",
          stacked: true,
          title: {
            display: true,
            text: "Value",
            padding: {
              top: 4,
              bottom: 4,
            },
            color: "#666",
          },
          type: "linear",
          ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: false,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2,
            color: "#666",
          },
          display: true,
          offset: false,
          reverse: false,
          beginAtZero: false,
          bounds: "ticks",
          grace: 0,
          grid: {
            display: true,
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            offset: false,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1,
            color: "rgba(0,0,0,0.1)",
            borderColor: "rgba(0,0,0,0.1)",
          },
          id: "y",
          position: "left",
        },
      },
    }}
    dataSets={[
      {
        label: "My Second dataset",
        data: [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142],
        borderColor: "white",
        backgroundColor: "#62D5D9",
        fill: true,
      },
      {
        label: "My Third dataset",
        data: [151, 152, 159, 154, 155, 156, 157, 158, 159, 160, 161, 162],
        borderColor: "white",
        backgroundColor: "#928AE0",
        fill: true,
      },
      {
        label: "My Fourth dataset",
        data: [150, 201, 160, 203, 151, 205, 206, 207, 208, 209, 210, 211],
        borderColor: "white",
        backgroundColor: "#EDB371",
        fill: true,
      },
    ]}
  />`,
    name: "Stacked Chart",
  },
  {
    scatter: `<RdsScatterChart
    id="scatterc"
    height={300}
    width={300}
    labels={['January', 'February', 'March', 'April']}
    options={{
      responsive: true,
      maintainAspectRatio: false, pointStyle: "triangle",
      radius: 10,
      plugins: {
        legend: {
          position: 'top',
          align: "center",
          pointStyle: "line",
          labels: {
            usePointStyle: true
          }
        },
        tooltip: {
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }}
    dataSets={[
      {
        type: 'scatter',
        label: 'Scatter Dataset',
        data: [
          {
            x: -10,
            y: 0
          },
          {
            x: -8,
            y: 3
          },
          {
            x: -5,
            y: 5
          },
          {
            x: 0,
            y: 9
          },
          {
            x: 4,
            y: 3
          },
          {
            x: 9,
            y: 5
          },
          {
            x: 0.5,
            y: 5.5
          }
        ],
        backgroundColor: 'rgb(146,138,224)'
      }
    ]}
  />`,
    name: "scatter",
  },
  {
    radar: `  <RdsRadarChart
    id="radar"
    height={300}
    width={300}
    labels={["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]}
    options={{
      responsive: false,
      chartArea: {
        backgroundColor: "rgba(251, 85, 85, 0.4)",
      },
      plugins: {
        title: {
          display: true,
          text: "Radar Chart",
        },
        legend: {
          position: "left",
          align: "start",
          pointStyle: "rectRot",
          pointRadius: 5,
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          usePointStyle: true,
        },
        scale: {
          type: "line",
          angleLines: {
            display: true,
          },
        },
      },
      scales: {
        r: {
          axis: "r",
          type: "radialLinear",
          display: true,
          animate: true,
          position: "chartArea",
          angleLines: {
            display: true,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0,
            color: "rgba(0,0,0,0.1)",
          },
          grid: {
            circular: false,
            display: true,
            lineWidth: 1,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            offset: false,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1,
            color: "rgba(0,0,0,0.1)",
            borderColor: "rgba(0,0,0,0.1)",
          },
          startAngle: 0,
          ticks: {
            showLabelBackdrop: true,
            color: "#666",
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2,
          },
          pointLabels: {
            backdropPadding: 2,
            display: true,
            font: {
              size: 10,
            },
            padding: 5,
            centerPointLabels: false,
            color: "#666",
          },
          offset: false,
          reverse: false,
          beginAtZero: false,
          bounds: "ticks",
          grace: 0,
          title: {
            display: false,
            text: "",
            padding: {
              top: 4,
              bottom: 4,
            },
            color: "#666",
          },
          id: "r",
        },
      },
    }}
    dataSets={[
      {
        label: "Dataset 1",
        data: [0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9],
        borderColor: ["#ff9f40"],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        fill: false,
        pointStyle: "circle",
        pointRadius: 2,
      },
      {
        label: "Dataset 2",
        data: [0.9, 0.3, 0.8, 0.9, 0.1, 0.7, 0.2],
        borderColor: ["#ff6384"],
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        fill: true,
        pointStyle: "circle",
        pointRadius: 2,
      },
      {
        label: "Dataset 3",
        data: [0.7, 0.2, 0.1, 0.9, 0.8, 0.4, 0.7],
        borderColor: ["#83BE5A"],
        backgroundColor: ["rgba(255, 240, 204, 0.2)"],
        fill: false,
        pointStyle: "circle",
        pointRadius: 2,
      },
    ]}
  />`,
    name: "Radar Chart",
  },
  {
    doughnut: ` <RdsDoughnutChart
    height={400}
    width={400}
    labels={["Red", "Orange", "Yellow", "Green", "Blue"]}
    options={{
      maintainAspectRatio: false,
      type: "doughnut",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Doughnut Chart",
          },
        },
      },
    }}
    dataSets={[
      {
        label: "Dataset 1",
        data: [20, 10, 30, 40],
        backgroundColor: ["#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0"],
        borderColor: ["#fff"],
      },
    ]}
    id="doughnut"
  />`,
    name: "Doughnut Chart",
  },
  {
    polarArea: "",
    name: "Polar Area Chart",
  }
];
export default code_snippet;
