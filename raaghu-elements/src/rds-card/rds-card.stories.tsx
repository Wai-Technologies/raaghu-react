import React from "react";
import RdsCard, { CardTypes } from "./rds-card";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsMap from "../rds-map";
import RdsDoughnutChart from "../rds-chart-doughnut";
import RdsAreaChart from "../rds-chart-area";
import RdsBooleanChart from "../rds-chart-boolean";
import { ScriptableContext } from "chart.js";
import RdsCompBigNumber from "../../../raaghu-components/src/rds-comp-big-number";
import RdsWidget from "../../../raaghu-components/src/rds-comp-widget";
import RdsBarChart from "../rds-chart-bar";
import RdsLineChart from "../rds-chart-line";
import RdsProgressBar from "../rds-progress-bar";
import { RdsCompIcon, RdsCompTable } from "../../../raaghu-components/src";

const meta: Meta = {
  title: 'Elements/Card',
  component: RdsCard,
  parameters: {
    layout: 'padded',
    docs: {
        description: {
    component: 'The **Card** element is a flexible and reusable container used to group related information in a visually appealing format. It supports a variety of **types**, such as cards with images, charts, maps, and data tables, enabling rich content presentation. With configurable **layouts**, states, and styles, it plays a key role in building structured and interactive UI sections across an application.'
},
      source: {
        transform: (code: string) => {
          return code.replace(/"(With Image|With Ring Chart|With Map|With Graph|With Badges|With Button|With Hyperlink|With Avatar|With Tags|With Boolean Chart|With Line Chart|With DataTable|With Chart|With Table|Advanced)"/g, '{CardTypes.$1}');
        }
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      options: ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"],
      control: { type: "select" },
    },
    borderColor: {
      options: ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"],
      control: { type: "select" },
    },
    style: {
      options: ["Default", "Outlined", "Filled"],
      control: { type: "select" },
    },
    state: {
      options: ["Default", "Hovered", "Selected", "Disabled"],
      control: { type: "select" },
    },
    layout: {
      options: ["Horizontal", "Vertical"],
      control: { type: "select" },
    },
    iconName: {
      options: ["users", "calendar", "chart", "close", "download", "edit", "file", "filter", "folder", "home", "info", "link", "menu", "minus", "plus", "search", "settings", "star", "upload"],
      control: { type: "select" },
    },
    type: {
      options: ["With Button", "With Hyperlink", "With Image", "With Ring Chart", "With Map", "With Graph", "With Badges", "With Tags", "With Avatar", "With Boolean Chart", "With Line Chart", "With DataTable","With Chart","With Table"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsCard>;

export default meta;
type Story = StoryObj<typeof RdsCard>;

const commonArgs = {
  state: "Default",
  style: "Default",
  showTitle: true,
  showIndicator: false,
  layout: "Vertical" as "Vertical" | "Horizontal",
  showIcon: true,
  iconName: "users",
  showTitleAndSubText: true,
  showSubTitle: true,
  colorVariant: "primary",
  borderColor: "",
  cardTitle: "Card title",
  cardSubTitle: "Card Sub title",
  cardText: `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
  buttonLabel1: "Link Button",
  buttonLabel2: "Cancel",
  buttonLabel3: "Okay",
  showFooter: true,
  showLinkButton: true,
  isDisabled: false,
  isEditing: false,
  imageUrl: "https://picsum.photos/seed/picsum/1200/600",
  showCardText: true,
};

export const Advanced: Story = {
    args: {
        ...commonArgs,
        type: CardTypes.Advanced,

    },
};
Advanced.parameters = { controls: { include: ['cardTitle','cardText','buttonLabel1','showFooter',] } };

export const WithButton: Story = {
  args: {
    ...commonArgs,
    type: CardTypes.WithButton,
  },
};
WithButton.parameters = { controls: { include: ['state', 'style', 'showTitle', 'showIndicator','layout','showIcon','iconName','showTitleAndSubText','showSubTitle','cardTitle','cardSubTitle','showFooter','showLinkButton','isDisabled','isEditing','showCardText'] } };

export const WithHyperlink: Story = {
  args: {
    ...commonArgs,
    type: CardTypes.WithHyperlink,
  },
};
WithHyperlink.parameters = { controls: { include: ['state', 'style', 'showTitle', 'showIndicator','layout','showIcon','iconName','showTitleAndSubText','showSubTitle','cardTitle','cardSubTitle','showFooter','showLinkButton','isDisabled','isEditing','showCardText'] } };

const WithImageArgs = {
    state: "Default",
    style: "Default",
    showTitle: true,
    cardTitle: "Mountain Image",
    showIndicator: false,
    layout: "Horizontal" as "Vertical" | "Horizontal",
    showTitleAndSubText: true,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
    imageUrl: "https://picsum.photos/seed/picsum/1200/600",
};

export const WithImage: Story = {
  args: {
    ...WithImageArgs,
    type: CardTypes.WithImage,
  },
};
WithImage.parameters = { controls: { include: ['state', 'style', 'showIndicator','layout', 'showTitleAndSubText', 'cardTitle','isDisabled'] } };

const WithRingChartArgs = {
    state: "Default",
    style: "Default",
    showTitle: true,
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithRingChart: Story = {
  args: {
    ...WithRingChartArgs,
    type: CardTypes.WithRingChart,
    children: (
      <RdsWidget
      headerTitle={"Profit Share"}
      isRefreshRequired={true}
      iconName="refresh"
      iconTooltipLabel="Refresh"
      iconTooltipPosition="top"
      isCardStretch={false}
  >
      <div>
          <RdsCompBigNumber bigNumber="$39,330"></RdsCompBigNumber>
          <div className="col col-sm-12">
              <RdsDoughnutChart
                  id="doughnutchart"
                  labels={['Total Sales - 85%', 'Revenue - 25%', 'Expenses - 15%']}


                  options={{
                      animationEnabled: true,
                      title: {
                          fontColor: "#fff",
                      },
                      cutoutPercentage: 80,

                      responsive: true,

                      subtitles: {
                          fontColor: "#fff",
                          verticalAlign: "center",
                      },
                      maintainAspectRatio: false,
                      plugins: {
                          series: {
                              label: {
                                  position: "inside",
                                  text: "total",
                                  display: false,
                                  font: {
                                      size: 12,
                                      weight: "regular",
                                  },
                              },
                          },
                          doughnutlabel: {
                              labels: [
                                  {
                                      text: "550",
                                      font: {
                                          size: 8,
                                          weight: "bold",
                                      },
                                  },
                                  {
                                      text: "total",
                                  },
                              ],
                          }, title: {
                              text: 'title sample',
                              font: {
                                  size: 12,

                              }
                          },
                          legend: {
                              display: true,
                              align: "middle",
                              position: "right",
                              color: "#fff",
                              labels: {
                                  boxWidth: 15,
                                  padding: 15,
                              },
                          },
                          tooltip: { enabled: false },
                      },
                      scales: {},
                  }}
                  dataSets={[
                      {

                          label: "Total Sales",
                          data: [85, 0, 0, 15],
                          backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                          weight: 0.2,
                          borderRadius: 20,
                          borderColor: ["transparent"],

                      },
                      {
                          weight: 0.2
                      },
                      {
                          label: "Revenue",
                          data: [0, 75, 0, 25],
                          backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                          weight: 0.2,
                          borderRadius: 20,
                          borderColor: ["transparent"]
                      },
                      {
                          weight: 0.2
                      },
                      {
                          label: "Expenses",
                          data: [0, 0, 55, 45],
                          backgroundColor: ["#FF6384", "#BF00BB", "#7E2EEF", "#d9c9ef33"],
                          weight: 0.2,
                          borderRadius: 20,
                          borderColor: ["transparent"]
                      },
                  ]}
              />
          </div>
      </div>
  </RdsWidget>
    ),
  },
};
WithRingChart.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

const WithMapArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithMap: Story = {
  args: {
    ...WithMapArgs,
    type: CardTypes.WithMap,
    children: (
      <RdsWidget
      headerTitle={"Sales"}
      isRefreshRequired={true}
      border={false}
      isIcon={false}
      iconName="flip_back"
      iconTooltipLabel={"Flip"}
      iconTooltipPosition={"top"}
      iconColor="success"
      isBignumberIcon={true}
      bigNumberLabel="$632,230"
      iconLabel="$27,203">
      <div className="pt-xxl-3 pt-xl-3 pt-lg-3 pt-md-5 pt-3 mt-lg-0 mt-md-5 mt-0">
          <RdsMap
              mapList={[
                { country: "cn", value: 1389618778 }, // china
                { country: "in", value: 1311559204 }, // india
                { country: "us", value: 331883986 }, // united states
                { country: "id", value: 264935824 }, // indonesia
                { country: "pk", value: 210797836 }, // pakistan
                { country: "br", value: 210301591 }, // brazil
                { country: "ng", value: 208679114 }, // nigeria
                { country: "bd", value: 161062905 }, // bangladesh
                { country: "ru", value: 141944641 }, // russia
                { country: "mx", value: 127318112 }, // mexico
              ]}
              color="#A478E6"></RdsMap>
      </div>
  </RdsWidget>
    ),
  },
};
WithMap.parameters = { controls: { include: ['state', 'style', 'showIndicator','layout', 'isDisabled'] } };

const WithGraphArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithGraph: Story = {
  args: {
    ...WithGraphArgs,
    type: CardTypes.WithGraph,
    children: (
      <RdsAreaChart
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
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
                pointStyleWidth: 13,
                boxWidth: 10,
                boxHeight: 10,
                padding: 30,
                height: 5,
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
            },
            x: {
              grid: {
                display: false,
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
            data: [600, 462, 405, 362, 350, 350.5, 320.8, 318, 605, 689, 352, 354],
            borderColor: "#4DCFFF",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 25, 0, 210);
              gradient.addColorStop(0.1, "rgba(25, 70, 186, 1)");
              gradient.addColorStop(1, "rgba(25, 70, 186, 0.08)");
              return gradient;
            },
            fill: true,
            pointRadius: 2,
            tension: 0.4,
          },
          {
            label: "Revenue",
            data: [250, 780.2, 780.4, 650, 455, 455.5, 455.8, 456, 610, 455, 250, 254],
            borderColor: "#863BFF",
            pointBackgroundColor: "#863BFF",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 25, 0, 210);
              gradient.addColorStop(0.1, "rgba(48, 22, 194, 1)");
              gradient.addColorStop(1, "rgba(48, 22, 194, 0.08)");
              return gradient;
            },
            fill: true,
            pointRadius: 2,
            tension: 0.4,
          },
        ]}
        id={""}
        isGradient={false}
      />
    ),
  },
};
WithGraph.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

const WithBooleanChartArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithBooleanChart: Story = {
  args: {
    ...WithBooleanChartArgs,
    type: CardTypes.WithBooleanChart,
    children: (
      <><div className="d-flex align-items-center">
        <div className="">
          <RdsBooleanChart
            centerIconName="headset"
            id="Boolean1"
            labels={[
              "Total Calls Connected",
              "Total Clients Called",
            ]}
            options={{
              elements: {
                center: {
                  text: "50%", //set as you wish
                },
              },
              cutoutPercentage: 75,
              legend: {
                display: false,
              },
              maintainAspectRatio: false,
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
                  align: "start",
                  position: "right",
                },
                tooltip: { enabled: false },
              },
            }}
            dataSets={[
              {
                label: "Dataset 1",
                data: [80, 100 - 80],
                fillStyle: "#d9c9ef33",
                fillRect: [200, 100, 40, 10],
                borderColor: ["transparent"],
                backgroundColor: ["#01AE9D", "#d9c9ef33"],
                cutout: "80%",
                title: {
                  text: "Doughnut Chart",
                  verticalAlign: "center",
                  dockInsidePlotArea: true,
                },
              },
            ]}
            chartStyle={""}
          ></RdsBooleanChart>
        </div>
        <div className="ms-2">
          <h3 className="custom-title">80%</h3>
          <p className="custom-desc mb-0">
            {"Total Calls Connected"}
          </p>
        </div>
      </div><div className="d-flex align-items-center mt-3">
          <div className="">
            <RdsBooleanChart
              centerIconName="users"
              id="Boolean2"
              labels={[
                "Total Client calls connected",
                "Total Client calls disconnected",
              ]}
              options={{
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
                maintainAspectRatio: false,
                plugins: {
                  series: {
                    label: {
                      position: "inside",
                      text: "total", // or "inside" | "outside"
                      display: true,
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
                    align: "start",
                    position: "right",
                    fontSize: 20,
                  },
                  tooltip: { enabled: false },
                },
              }}
              dataSets={[
                {
                  label: "Dataset 1",
                  data: [65, 100 - 65],
                  fillStyle: "#D0D7DD",
                  fillRect: [200, 100, 40, 10],
                  backgroundColor: ["#F3AB19", "#d9c9ef33"],
                  borderColor: ["transparent"],
                  cutout: "80%",
                  title: {
                    text: "Doughnut Chart",
                    verticalAlign: "center",
                    dockInsidePlotArea: true,
                  },
                },
              ]}
              chartStyle={""}
            ></RdsBooleanChart>
          </div>
          <div className="ms-2">
            <h3 className="custom-title">20%</h3>
            <p className="custom-desc mb-0">
              {"Total Clients Called"}
            </p>
          </div>
        </div></>
    ),
  },
};
WithBooleanChart.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

export const WithBadges: Story = {
  args: {
    ...commonArgs,
    type: CardTypes.WithBadges,
  },
};
WithBadges.parameters = { controls: { include: ['state', 'style', 'showTitle', 'showIndicator','layout','showIcon','iconName','showTitleAndSubText','showSubTitle','cardTitle','cardSubTitle','showFooter','showLinkButton','isDisabled','isEditing','showCardText'] } };

export const WithTags: Story = {
  args: {
    ...commonArgs,
    type: CardTypes.WithTags,
  },
};
WithTags.parameters = { controls: { include: ['state', 'style', 'showTitle', 'showIndicator','layout','showIcon','iconName','showTitleAndSubText','showSubTitle','cardTitle','cardSubTitle','showFooter','showLinkButton','isDisabled','isEditing','showCardText'] } };

export const WithAvatar: Story = {
  args: {
    ...commonArgs,
    type: CardTypes.WithAvatar,
  },
};
WithAvatar.parameters = { controls: { include: ['state', 'style', 'showTitle', 'showIndicator','layout','showIcon','iconName','showTitleAndSubText','showSubTitle','cardTitle','cardSubTitle','showFooter','showLinkButton','isDisabled','isEditing','showCardText'] } };

const WithLineChartArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithLineChart: Story = {
  args: {
    ...WithLineChartArgs,
    type: CardTypes.WithBooleanChart,
    children: (
      <RdsWidget
                                headerTitle={"Daily Sales Growth"}
                                isRefreshRequired={true}

                            >
                                <div>
                                    <RdsCompBigNumber
                                        bigNumber="$373,960"
                                        icon={"triangle_down"}
                                        iconHeight={"12px"}
                                        subTitle="-$5850"
                                        iconStroke={false}
                                        iconFill={true}
                                        iconWidth={"12px"}
                                        subTitleColorVariant="danger"
                                    ></RdsCompBigNumber>
                                    <div className="d-flex align-items-center fw-normal my-2 mb-4">
                                        <span>
                                            <RdsCompIcon
                                                name="triangle_up"
                                                height="14px"
                                                width="14px"
                                                colorVariant="danger"
                                                fill={true}
                                                stroke={false} />
                                        </span>
                                        <span className={'fs-6 fw-medium text-danger'}>$5850</span>
                                    </div>
                                    <RdsBarChart
                                        id="barchart"
                                        labels={[
                                            "Day4",
                                            "Day8",
                                            "Day12",
                                            "Day16",
                                            "Day20",
                                        ]}
                                        options={{
                                            indexAxis: "x",
                                            elements: {
                                                bar: {
                                                    borderWidth: 0,
                                                    width: 1,
                                                },
                                            },
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: "",
                                                    pointStyle: "line",
                                                    labels: {
                                                        usePointStyle: true,
                                                    },
                                                },
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                                tooltip: {
                                                    usePointStyle: true,
                                                },
                                                title: {
                                                    display: false,
                                                    text: "Daily Sales Growth",
                                                },
                                            },
                                            
                                            scales: {
                                                x: {
                                                    grid: {
                                                        drawTicks: true,
                                                        drawBorder: true,
                                                        borderWidth: 1,
                                                        borderDash: [5, 5],
                                                        borderDashOffset: 2,
                                                        tickBorderDash: [5, 5],
                                                        color: 'rgba(218, 221, 224, 0.8)',
                                                    },
                                                    border: {
                                                        dash: [3, 3]
                                                    },
                                                },
                                                y: {
                                                    display: true,
                                                    grid: {
                                                        display: false
                                                    }
                                                }
                                            },
                                        }}
                                        dataSets={[
                                            {
                                                label: "Sales Growth",
                                                data: [
                                                    15, 18, 67, 34, 78, 45, 87, 76, 32, 50, 14, 35, 22,
                                                ],
                                                backgroundColor: (
                                                    context: ScriptableContext<"line">
                                                ) => {
                                                    const ctx = context.chart.ctx;
                                                    const gradient = ctx.createLinearGradient(
                                                        0,
                                                        50,
                                                        0,
                                                        300
                                                    );
                                                    gradient.addColorStop(0, "rgba(54, 162, 235, 1)");
                                                    gradient.addColorStop(
                                                        1,
                                                        "rgba(54, 162, 235, 0.08)"
                                                    );
                                                    return gradient;
                                                },
                                                borderColor: "#666666",
                                                borderWidth: 0,
                                                borderRadius: 10,
                                                barThickness: 7,
                                                borderSkipped: false,
                                            },
                                        ]}
                                    />
                                </div>
       </RdsWidget>
    )},
};
WithLineChart.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

const WithDataTableArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithDataTable: Story = {
  args: {
    ...WithDataTableArgs,
    type: CardTypes.WithTable,
    children :(
      <RdsWidget
                        headerTitle={"Member Activity"}
                        isRefreshRequired={true}
                    >
                        <div className="table-responsive">
                            <RdsCompTable
                                tableHeightForScroll="356px"

                                headerDatas={[
                                    {
                                        displayName: ("Members"),
                                        key: "member",
                                        dataType: "html",
                                    },
                                    { displayName: ("Cases"), key: "cases", dataType: "html" },
                                    {
                                        displayName: ("Active"),
                                        key: "active",
                                        dataType: "html",
                                    },
                                    {
                                        displayName: ("Closed"),
                                        key: "closed",
                                        dataType: "html",
                                    },
                                    { displayName: ("Rate"), key: "rate", dataType: "html" },
                                ]}
                                tableDatas={[
                                    {
                                        id: 12,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Brian</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Software Developer{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 38 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="HighRate d-flex align-items-center justify-content-start ">
                                                92%
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 23,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 18 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Kim</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Senior Developer{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 342 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 25 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                42%
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 22,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 7 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px\"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Jane</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Sales Executive{" "}
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 25 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 5 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="HighRate d-flex align-items-center justify-content-start">
                                                96%
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 11,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 14 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px\"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Brian</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Software Developer
                                                    </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 42 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 42 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="LowRate d-flex align-items-center justify-content-start">
                                                16%
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 19,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 13 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px\"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Kath</b>
                                                    </p>
                                                    <small>Manager </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 3 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                52%
                                            </div>
                                        ),
                                    },
                                    ,
                                    {
                                        id: 20,
                                        cases: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 13 </div>
                                            </div>
                                        ),
                                        member: (
                                            <div className="d-flex align-items-center gap-2">
                                                <div>
                                                    {" "}
                                                    <img
                                                        src="./assets/dashboard-data.png"
                                                        width="40px\"
                                                    />
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">
                                                        <b>Kath</b>
                                                    </p>
                                                    <small>Manager </small>
                                                </div>
                                            </div>
                                        ),
                                        active: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 10 </div>
                                            </div>
                                        ),
                                        closed: (
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div> 3 </div>
                                            </div>
                                        ),
                                        rate: (
                                            <div className="MidRate d-flex align-items-center justify-content-start">
                                                52%
                                            </div>
                                        ),
                                    },
                                ]}
                            ></RdsCompTable>
                        </div>

                    </RdsWidget>
    )},
};
WithDataTable.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

const WithChartArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
};

export const WithChart: Story = {
  args: {
    ...WithChartArgs,
    type: CardTypes.WithTable,
    children :( 
      <RdsWidget
      headerTitle={"Maximum Profit"}
      isRefreshRequired={false}

      height="auto"

  >
      <RdsCompBigNumber bigNumber="$8,425"></RdsCompBigNumber>
      <RdsLineChart

          id="linechart1"

          labels={["12am", "4am", "8am", "12pm", "4pm", "8pm"]}

          options={{

              radius: 0,

              pointStyle: "circle",

              responsive: true,

              borderWidth: 1,

              maintainAspectRatio: false,

              plugins: {

                  title: {

                      display: false,

                  },

                  legend: {
                      display: false,
                      position: "top",

                      align: "end",

                      pointStyle: "circle",

                      boxWidth: "10",
                      boxHeight: "10",

                      labels: {

                          usePointStyle: true,

                          pointStyleWidth: 13,

                          boxWidth: 10,

                          boxHeight: 10,

                          padding: 30,

                          height: 5,

                      },

                  },

                  tooltip: {

                      enabled: false,

                  },

              },

              scales: {

                  y: {

                      axis: "y",

                      beginAtZero: true,
                      min: 0,
                      legend: {
                          display: false,
                          labels: {

                              maxheight: 9,

                          },

                      },

                      grid: {

                          display: false,

                          lineWidth: 1,

                          drawBorder: true,

                          drawOnChartArea: true,

                          drawTicks: true,

                          tickLength: 8,

                          offset: false,



                          borderDashOffset: 0,

                          borderWidth: 1,
                          borderDash: [1, 1],

                          color: "#c7c7c7",

                          borderColor: "#c7c7c7",


                      },

                      type: "linear",

                      ticks: {

                          minRotation: 0,

                          maxRotation: 50,

                          mirror: false,

                          textStrokeWidth: 0,

                          textStrokeColor: "",

                          padding: 3,

                          display: false,

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

                      display: false,

                      offset: false,

                      reverse: false,

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

                      id: "y",

                      position: "left",

                  },

                  x: {

                      axis: "x",

                      grid: {

                          display: false,

                          lineWidth: 1,

                          drawBorder: true,

                          drawOnChartArea: false,

                          drawTicks: true,

                          tickLength: 8,

                          offset: false,

                          borderDash: [1, 1],

                          borderDashOffset: 0,

                          borderWidth: 1,

                          color: "rgba(0,0,0,0.1)",

                          borderColor: "rgba(0,0,0,0.1)",

                      },

                      type: "category",

                      ticks: {

                          minRotation: 0,

                          maxRotation: 50,

                          mirror: false,

                          textStrokeWidth: 0,

                          textStrokeColor: "",

                          padding: 3,

                          display: false,

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

                      display: false,

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

                      id: "x",

                      position: "bottom",

                  },

              },

              tooltip: {

                  display: false,



              },

          }}

          dataSets={[

              {

                  data: [2.4, 4.7, 2.2, 4.2, 4.5, 2.7, 3.6,],
                  borderColor: "#4DCFFF",

                  pointBackgroundColor: "#4DCFFF",

                  fill: true,

                  pointRadius: 0,

                  backgroundColor: (context: ScriptableContext<"line">) => {

                      const ctx = context.chart.ctx;

                      const gradient = ctx.createLinearGradient(0, 0, 0, 210);

                      gradient.addColorStop(0.1, "rgba(77,207,255, 0.8)");

                      gradient.addColorStop(0.25, "rgba(77,207,255, 0.1)");

                      return gradient;

                  },

                  tension: 0.3,

              }

          ]}

      />

  </RdsWidget>
    )},
};
WithChart.parameters = { controls: { include: ['state', 'style', 'showIndicator', 'isDisabled'] } };

const WithTableArgs = {
    state: "Default",
    style: "Default",
    showIndicator: false,
    colorVariant: "primary",
    borderColor: "",
    isDisabled: false,
  };

export const WithTable : Story = {
  args: {
    ...WithTableArgs,
    type: CardTypes.WithTable,
    children :(
<RdsWidget
                        headerTitle={"To do List"}
                        isRefreshRequired={true}
                    >
                        <div className="table-responsive">
                            <RdsCompTable id="sortable"

                                headerDatas={[
                                    {
                                        displayName: ("Project"),
                                        key: "project",
                                        dataType: "html",
                                    },
                                    { displayName: ("Issue"), key: "issue", dataType: "html" },

                                    {
                                        displayName: ("Progress"),
                                        key: "progress",
                                        dataType: "html",
                                    },
                                ]}
                                tableDatas={[
                                    {
                                        id: 1,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small >Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <div>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        width={"245px"}
                                                        // displayLevel={false}
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small >Due in two days</small>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Your Order @22345678 has been confirmed
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ABP Framework</b>
                                                    </p>
                                                    <small>Modules</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        // displayLevel={false}
                                                        displayPercentage={false}
                                                        colorVariant={"danger"}
                                                        progressWidth={20}
                                                        role={"single"}
                                                        width={"245px"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small>Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Create a new page for CMS
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>ASPNET Zero</b>
                                                    </p>
                                                    <small className="custom-desc">
                                                        Payment Module
                                                    </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        // displayLevel={false}
                                                        displayPercentage={false}
                                                        colorVariant={"success"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div className="custom-desc">
                                                    <div>Payment Module</div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">ABP framework</small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        // displayLevel={false}
                                                        displayPercentage={false}
                                                        colorVariant={"warning"}
                                                        progressWidth={80}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        issue: (
                                            <div className="d-flex align-items-center  \">
                                                <div>
                                                    <div className="custom-desc">
                                                        Activate your account with others intil June 2023
                                                    </div>{" "}
                                                </div>
                                            </div>
                                        ),

                                        project: (
                                            <div className="d-flex align-items-center ">
                                                <div className="ms-2 mt-2\">
                                                    <p className="mb-1">
                                                        <b>Volosoft</b>
                                                    </p>
                                                    <small className="custom-desc">Website </small>
                                                </div>
                                            </div>
                                        ),

                                        progress: (
                                            <>
                                                <div className="mb-2">
                                                    <RdsProgressBar
                                                        // displayLevel={false}
                                                        displayPercentage={false}
                                                        colorVariant={"primary"}
                                                        progressWidth={40}
                                                        role={"single"} steps={0} completedSteps={0}                                                    ></RdsProgressBar>
                                                </div>
                                                <small className="custom-desc">Due in two days</small>
                                            </>
                                        ),
                                    },
                                ]}
                            ></RdsCompTable>
                        </div>
                    </RdsWidget>
    )},
};
WithTable.parameters = { controls: { include: ['state', 'style', 'showIndicator','isDisabled'] } };