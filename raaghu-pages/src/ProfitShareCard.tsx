import { RdsCard, RdsWidget, RdsBigNumber, RdsDoughnutChart } from "../../raaghu-elements/src";
import { CardTypes } from "../../raaghu-elements/src/rds-card/rds-card";

const ProfitShareCard = () => {
  return (
    <RdsCard
      borderColor=""
      buttonLabel1="Link Button"
      buttonLabel2="Cancel"
      buttonLabel3="Okay"
      cardSubTitle="Card Sub title"
      cardText="In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo"
      cardTitle="Card title"
      colorVariant="primary"
      iconName="users"
      imageUrl="https://picsum.photos/seed/picsum/1200/600"
      layout="Vertical"
      showCardText
      showFooter
      showIcon
      showLinkButton
      showSubTitle
      showTitle
      showTitleAndSubText={false}
      state="Default"
      style="Default"
      type={CardTypes.CardWithRingChart}
    >
      <RdsWidget
        headerTitle="Profit Share"
        iconName="refresh"
        iconTooltipLabel="Refresh"
        iconTooltipPosition="top"
        isRefreshRequired
      >
        <div>
          <RdsBigNumber bigNumber="$55,266" />
          <div className="col col-sm-12">
            <RdsDoughnutChart
              dataSets={[
                {
                  backgroundColor: ['#FF6384', '#BF00BB', '#7E2EEF', '#d9c9ef33'],
                  borderColor: ['transparent'],
                  borderRadius: 20,
                  data: [86, 0, 0, 14],
                  label: 'Total Sales',
                  weight: 0.2
                },
                { weight: 0.2 },
                {
                  backgroundColor: ['#FF6384', '#BF00BB', '#7E2EEF', '#d9c9ef33'],
                  borderColor: ['transparent'],
                  borderRadius: 20,
                  data: [0, 73, 0, 27],
                  label: 'Revenue',
                  weight: 0.2
                },
                { weight: 0.2 },
                {
                  backgroundColor: ['#FF6384', '#BF00BB', '#7E2EEF', '#d9c9ef33'],
                  borderColor: ['transparent'],
                  borderRadius: 20,
                  data: [0, 0, 57, 43],
                  label: 'Expenses',
                  weight: 0.2
                }
              ]}
              id="doughnutchart"
              labels={['Total Sales - 86%', 'Revenue - 73%', 'Expenses - 57 %']}
              options={{
                animationEnabled: true,
                cutoutPercentage: 80,
                maintainAspectRatio: false,
                plugins: {
                  doughnutlabel: {
                    labels: [
                      { font: { size: 8, weight: 'bold' }, text: '550' },
                      { text: 'total' }
                    ]
                  },
                  legend: {
                    align: 'middle',
                    color: '#fff',
                    display: true,
                    labels: { boxWidth: 15, padding: 15 },
                    position: 'right'
                  },
                  series: {
                    label: {
                      display: false,
                      font: { size: 12, weight: 'regular' },
                      position: 'inside',
                      text: 'total'
                    }
                  },
                  title: { font: { size: 12 }, text: 'title sample' },
                  tooltip: { enabled: false }
                },
                responsive: true,
                scales: {},
                subtitles: { fontColor: '#fff', verticalAlign: 'center' },
                title: { fontColor: '#fff' }
              }}
            />
          </div>
        </div>
      </RdsWidget>
    </RdsCard>
  );
};

export default ProfitShareCard;