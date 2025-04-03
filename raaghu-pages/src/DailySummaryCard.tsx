import { RdsCard, RdsAreaChart } from "../../raaghu-elements/src";
import { CardTypes } from "../../raaghu-elements/src/rds-card/rds-card";

const DailySummaryCard = () => {
  return (
    <RdsCard
      borderColor=""
      buttonLabel1="Link Button"
      buttonLabel2="Cancel"
      buttonLabel3="Okay"
      cardSubTitle=""
      cardText=""
      cardTitle="Daily Summary"
      colorVariant="primary"
      iconName=""
      imageUrl=""
      layout="Vertical"
      showCardText={false}
      showFooter={false}
      showIcon={false}
      showLinkButton={false}
      showSubTitle={false}
      showTitle={true}
      showTitleAndSubText={false}
      state="Default"
      style="Default"
      type={CardTypes.CardWithGraph}
    >
      <RdsAreaChart
        dataSets={[
          {
            backgroundColor: () => { },
            borderColor: '#863BFF',
            data: [4000, 3000, 5000, 4000, 7000, 2000, 7500, 6000, 6500, 3000, 7000, 4000],
            fill: true,
            label: 'Sales',
            pointRadius: 2,
            tension: 0.4
          },
          {
            backgroundColor: () => { },
            borderColor: '#4DCFFF',
            data: [2000, 9000, 3500, 6000, 9000, 4000, 10000, 5000, 9000, 5000, 3000, 4000],
            fill: true,
            label: 'Revenue',
            pointBackgroundColor: '#4DCFFF',
            pointRadius: 2,
            tension: 0.4
          }
        ]}
        id=""
        labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        options={{
          borderWidth: 2,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              align: 'end',
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
            tooltip: { enabled: true }
          },
          pointStyle: 'circle',
          radius: 0,
          responsive: true,
          scales: {
            x: {
              grid: {
                borderColor: 'rgba(0,0,0,0.1)',
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1,
                color: 'rgba(0,0,0,0.1)',
                display: false,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
                lineWidth: 1,
                offset: false,
                tickLength: 8
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                borderColor: 'rgba(0,0,0,0.1)',
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1,
                color: 'rgba(0,0,0,0.1)',
                display: false,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
                lineWidth: 1,
                offset: false,
                tickLength: 8
              },
              legend: { labels: { maxheight: 10 } }
            }
          },
          tooltip: { display: true, usePointStyle: true }
        }} isGradient={false}      />
    </RdsCard>
  );
};

export default DailySummaryCard;