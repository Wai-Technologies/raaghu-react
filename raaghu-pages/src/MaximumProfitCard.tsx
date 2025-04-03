import { RdsCard, RdsWidget, RdsBigNumber, RdsLineChart } from "../../raaghu-elements/src";
import { CardTypes } from "../../raaghu-elements/src/rds-card/rds-card";

const MaximumProfitCard = () => {
  return (
    <RdsCard
      borderColor=""
      cardTitle=""
      cardSubTitle=""
      cardText=""
      colorVariant="primary"
      layout="Vertical"
      showCardText={false}
      showFooter={false}
      showIcon={false}
      showLinkButton={false}
      showSubTitle={false}
      showTitle={false}
      showTitleAndSubText={false}
      state="Default"
      style="Default"
      type={CardTypes.CardWithTable}
    >
      <RdsWidget
        headerTitle="Maximum Profit"
        height="auto"
      >
        <RdsBigNumber bigNumber="$7,569" />
        <RdsLineChart
          dataSets={[{
            backgroundColor: () => { },
            borderColor: '#4DCFFF',
            data: [2.4, 4.7, 2.2, 4.2, 4.5, 2.7, 3.6],
            fill: true,
            pointBackgroundColor: '#4DCFFF',
            pointRadius: 0,
            tension: 0.3
          }]}
          id="linechart1"
          labels={['12am', '4am', '8am', '12pm', '4pm', '8pm']}
          options={{
            borderWidth: 1,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                align: 'end',
                boxHeight: '10',
                boxWidth: '10',
                display: false,
                labels: {
                  boxHeight: 10,
                  boxWidth: 10,
                  height: 5,
                  padding: 30,
                  pointStyleWidth: 13,
                  usePointStyle: true
                },
                pointStyle: 'circle',
                position: 'top'
              },
              title: { display: false },
              tooltip: { enabled: false }
            },
            pointStyle: 'circle',
            radius: 0,
            responsive: true,
            scales: {
              x: {
                axis: 'x',
                beginAtZero: false,
                bounds: 'ticks',
                display: false,
                grace: 0,
                grid: {
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderDash: [1, 1],
                  borderDashOffset: 0,
                  borderWidth: 1,
                  color: 'rgba(0,0,0,0.1)',
                  display: false,
                  drawBorder: true,
                  drawOnChartArea: false,
                  drawTicks: true,
                  lineWidth: 1,
                  offset: false,
                  tickLength: 8
                },
                id: 'x',
                offset: false,
                position: 'bottom',
                reverse: false,
                ticks: {
                  align: 'center',
                  autoSkip: true,
                  autoSkipPadding: 3,
                  backdropColor: 'rgba(255, 255, 255, 0.75)',
                  backdropPadding: 2,
                  color: '#666',
                  crossAlign: 'near',
                  display: false,
                  labelOffset: 0,
                  major: {},
                  maxRotation: 50,
                  minRotation: 0,
                  minor: {},
                  mirror: false,
                  padding: 3,
                  showLabelBackdrop: false,
                  textStrokeColor: '',
                  textStrokeWidth: 0
                },
                title: {
                  color: '#666',
                  display: false,
                  padding: { bottom: 4, top: 4 },
                  text: ''
                },
                type: 'category'
              },
              y: {
                axis: 'y',
                beginAtZero: true,
                bounds: 'ticks',
                display: false,
                grace: 0,
                grid: {
                  borderColor: '#c7c7c7',
                  borderDash: [1, 1],
                  borderDashOffset: 0,
                  borderWidth: 1,
                  color: '#c7c7c7',
                  display: false,
                  drawBorder: true,
                  drawOnChartArea: true,
                  drawTicks: true,
                  lineWidth: 1,
                  offset: false,
                  tickLength: 8
                },
                id: 'y',
                legend: { display: false, labels: { maxheight: 9 } },
                min: 0,
                offset: false,
                position: 'left',
                reverse: false,
                ticks: {
                  align: 'center',
                  autoSkip: true,
                  autoSkipPadding: 3,
                  backdropColor: 'rgba(255, 255, 255, 0.75)',
                  backdropPadding: 2,
                  color: '#666',
                  crossAlign: 'near',
                  display: false,
                  labelOffset: 0,
                  major: {},
                  maxRotation: 50,
                  minRotation: 0,
                  minor: {},
                  mirror: false,
                  padding: 3,
                  showLabelBackdrop: false,
                  textStrokeColor: '',
                  textStrokeWidth: 0
                },
                title: {
                  color: '#666',
                  display: false,
                  padding: { bottom: 4, top: 4 },
                  text: ''
                },
                type: 'linear'
              }
            },
            tooltip: { display: false }
          }}
        />
      </RdsWidget>
    </RdsCard>
  );
};

export default MaximumProfitCard;