import { RdsCard, RdsBooleanChart } from "../../raaghu-elements/src";
import { CardTypes } from "../../raaghu-elements/src/rds-card/rds-card";

const CallOverview = () => {
  return (
    <RdsCard
      borderColor=""
      cardTitle="Call Overview Hello"
      colorVariant="primary"
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
      type={CardTypes.CardWithBooleanChart}
    >
      <div className="d-flex align-items-center">
        <div className="">
          <RdsBooleanChart
            centerIconName="headset"
            chartStyle=""
            dataSets={[{
              backgroundColor: ['#01AE9D', '#d9c9ef33'],
              borderColor: ['transparent'],
              cutout: '80%',
              data: [97, 3],
              fillRect: [200, 100, 40, 10],
              fillStyle: '#d9c9ef33',
              label: 'Dataset 1',
              title: { dockInsidePlotArea: true, text: 'Doughnut Chart', verticalAlign: 'center' }
            }]}
            id="Boolean1"
            labels={['Total Calls Connected', 'Total Calls Disconnected']}
            options={{
              cutoutPercentage: 75,
              elements: { center: { text: '50%' } },
              legend: { display: false },
              maintainAspectRatio: false,
              plugins: {
                doughnutlabel: { labels: [{ font: { size: 20, weight: 'bold' }, text: '550' }, { text: 'total' }] },
                legend: { align: 'start', display: false, position: 'right' },
                series: { label: { display: false, position: 'inside', text: 'total' } },
                tooltip: { enabled: false }
              },
              responsive: true
            }}
          />
        </div>
        <div className="ms-2">
          <h3 className="custom-title">
            97%
          </h3>
          <p className="custom-desc mb-0">
            Total Calls Connected
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center mt-3">
        <div className="">
          <RdsBooleanChart
            centerIconName="users"
            chartStyle=""
            dataSets={[{
              backgroundColor: ['#FF5733', '#d9c9ef33'],
              borderColor: ['transparent'],
              cutout: '80%',
              data: [95, 5],
              fillRect: [200, 100, 40, 10],
              fillStyle: '#D0D7DD',
              label: 'Dataset 1',
              title: { dockInsidePlotArea: true, text: 'Doughnut Chart', verticalAlign: 'center' }
            }]}
            id="Boolean2"
            labels={['Total Client calls connected', 'Total Client calls disconnected']}
            options={{
              cutoutPercentage: 75,
              elements: { center: { text: '50%' } },
              legend: { display: false },
              maintainAspectRatio: false,
              plugins: {
                doughnutlabel: { labels: [{ font: { size: 20, weight: 'bold' }, text: '550' }, { text: 'total' }] },
                legend: { align: 'start', display: false, fontSize: 20, position: 'right' },
                series: { label: { display: true, position: 'inside', text: 'total' } },
                tooltip: { enabled: false }
              },
              responsive: true
            }}
          />
        </div>
        <div className="ms-2">
          <h3 className="custom-title">
            35,21,256
          </h3>
          <p className="custom-desc mb-0">
            Total Clients Called
          </p>
        </div>
      </div>
    </RdsCard>
  );
};

export default CallOverview;