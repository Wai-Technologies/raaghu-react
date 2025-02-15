import React from "react";
import RdsCard from "./rds-card";
import { Meta, StoryObj } from "@storybook/react";
import { ScriptableContext } from "chart.js";

//Whatever code is commented in this file is needed in fututre reference - enhancement as per figma design

const meta: Meta = {
    title: 'Elements/Card',
    component: RdsCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        borderColor: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        style: {
            options: [
                "Default"   ,
                "Outlined"  ,
                "Filled"    
            ],
            control: { type: "select" },
        },
        state: {
            options: [
                "Default"   ,
                "Hovered"  ,
                "Selected",
                "Disabled"    
            ],
            control: { type: "select" },
        },
        layout: {
            options: [
                "Horizontal",
                "Vertical",
            ],
            control: { type: "select" },
        },
        iconName: {
            options: [
                "users",
                "calendar",
                "chart",
                "close",
                "download",
                "edit",
                "file",
                "filter",
                "folder",
                "home",
                "info",
                "link",
                "menu",
                "minus",
                "plus",
                "search",
                "settings",
                "star",
                "upload",
            ],
            control: { type: "select" },
        },
        type: {
            options: [
                "Card With Button",
                "Card With Link Button",
                "Card With Image",
                "Card With Ring Chart",
                "Card With Map",
                "Card With Graph",
                "Example-Badges",
                "Example-Tags",     
                "Example-Avatar",
                "Example-Avatar-Alt",

            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCard>;

export default meta;
type Story = StoryObj<typeof RdsCard>;


export const Default: Story = {
    args: {
        state:"Default",
        style:"Default",
        showTitle: true,
        showIndicator: false,
        layout: "Vertical",
        showIcon : true,
        iconName  : "users",
        showTitleAndSubText: true,
        showSubTitle: true,
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
            `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Cancel",
        buttonLabel3: "Okay",
        showFooter: true,  
        showLinkButton: true,
        isDisabled : false,
        type: "Card With Button",
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
        mapList: [
            { country: "cn", value: 1389618778 }, // china
            { country: "in", value: 1311559204 }, // india
            { country: "us", value: 331883986 },  // united states
            { country: "id", value: 264935824 },  // indonesia
            { country: "pk", value: 210797836 },  // pakistan
            { country: "br", value: 210301591 },  // brazil
            { country: "ng", value: 208679114 },  // nigeria
            { country: "bd", value: 161062905 },  // bangladesh
            { country: "ru", value: 141944641 },  // russia
            { country: "mx", value: 127318112 }   // mexico
          ],
         labelsForArea: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  optionsForArea: {
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
                      scales:
                      {
                          y: {
                              beginAtZero: true,
                              legend: {
                                  labels: {
                                      maxheight: 10
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
                              }
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
                              }
                          },
                      },
                      tooltip: {
                          display: true,
                          usePointStyle: true,
                      },
                  },
                  dataSetsForArea: [
                      {
                          label: "Sales",
                          data: [600, 462, 405, 362, 350, 350.5, 320.8, 318, 605, 689, 352, 354],
                          borderColor: "#4DCFFF",
                          // pointBackgroundColor: "#4DCFFF",
                          backgroundColor: (context: ScriptableContext<"line">) => {
          
                              const ctx = context.chart.ctx;
          
                              const gradient = ctx.createLinearGradient(0, 25, 0, 210);
          
                              gradient.addColorStop(0.1, "rgba(25, 70, 186, 1)");
          
                              gradient.addColorStop(1, "rgba(25, 70, 186, 0.08)");
          
                              return gradient;
          
                          },
                          fill: true,
                          pointRadius: 2,
                          // fillColor: "rgba(195, 40, 96, 0.1)",
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
                      }
                  ],

        dataSets:[
            {
              backgroundColor: [
                '#FF6384',
                '#BF00BB',
                '#7E2EEF',
                '#d9c9ef33'
              ],
              borderColor: [
                'transparent'
              ],
              borderRadius: 20,
              data: [
                85,
                0,
                0,
                15
              ],
              label: 'Total Sales',
              weight: 0.2
            },
            {
              data: [],
              weight: 0.2
            },
            {
              backgroundColor: [
                '#FF6384',
                '#BF00BB',
                '#7E2EEF',
                '#d9c9ef33'
              ],
              borderColor: [
                'transparent'
              ],
              borderRadius: 20,
              data: [
                0,
                75,
                0,
                25
              ],
              label: 'Revenue',
              weight: 0.2
            },
            {
              data: [],
              weight: 0.2
            },
            {
              backgroundColor: [
                '#FF6384',
                '#BF00BB',
                '#7E2EEF',
                '#d9c9ef33'
              ],
              borderColor: [
                'transparent'
              ],
              borderRadius: 20,
              data: [
                0,
                0,
                55,
                45
              ],
              label: 'Expenses',
              weight: 0.2
            }
          ],
          labels:[
            'Total Sales - 85%',
            'Revenue - 25%',
            'Expenses - 15%'
          ],
          options:{
            animationEnabled: true,
            cutoutPercentage: 80,
            legend: {
              display: false
            },
            maintainAspectRatio: false,
            plugins: {
              doughnutlabel: {
                labels: [
                  {
                    font: {
                      size: 8,
                      weight: 'bold'
                    },
                    text: '550'
                  },
                  {
                    text: 'total'
                  }
                ]
              },
              legend: {
                align: 'middle',
                display: true,
                labels: {
                  boxWidth: 15,
                  padding: 15
                },
                position: 'top'
              },
              series: {
                label: {
                  display: false,
                  font: {
                    size: 12,
                    weight: 'regular'
                  },
                  position: 'inside',
                  text: 'total'
                }
              },
              title: {
                font: {
                  size: 12
                },
                text: 'title sample'
              },
              tooltip: {
                enabled: false
              }
            },
            responsive: true,
            scales: {},
            subtitles: {
              fontColor: '#fff',
              verticalAlign: 'center'
            },
            title: {
              fontColor: '#fff'
            }
          },
    }
} satisfies Story;
Default.parameters = { controls: { include: [
    //  'colorVariant',
    //  'borderColor',
      'cardTitle',
       'layout',
        // 'cardText',
        //  'buttonLabel1',
        //   'buttonLabel2', 
        //   'showFooter',
           'showLinkButton',
            'showTitle',
             'showSubTitle',
              'iconName',
            //    "isDisabled",
                "showIcon", 
                "style",
                 "state",
                "showIndicator",
                "showTitleAndSubText",
                "type",
            ] } };
