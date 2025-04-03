import { RdsCard, RdsIcon, RdsBigNumber, RdsBarChart, RdsWidget } from "../../raaghu-elements/src";
import { CardTypes } from "../../raaghu-elements/src/rds-card/rds-card";

const DailySalesGrowth = () => {
  return (
    <RdsCard
      borderColor=""
      colorVariant="primary"
      layout="Vertical"
      showTitleAndSubText={false}
      state="Default"
      style="Default"
      type={CardTypes.CardWithGraph}
    >
      <RdsWidget headerTitle="Daily Sales Growth" isRefreshRequired>
        <div>
          <RdsBigNumber
            bigNumber="$632,230"
            icon="triangle_up"
            iconFill
            iconHeight="12px"
            iconWidth="12px"
            subTitle="$27,203"
            subTitleColorVariant="danger"
          />
          <div className="d-flex align-items-center fw-normal my-2 mb-4">
            <span>
              <RdsIcon
                colorVariant="danger"
                fill
                height="14px"
                name="triangle_up"
                width="14px"
              />
            </span>
            <span className="fs-6 fw-medium text-danger">$27,203</span>
          </div>
          <RdsBarChart
            dataSets={[
              {
                backgroundColor: () => {},
                barThickness: 7,
                borderColor: '#666666',
                borderRadius: 10,
                borderSkipped: false,
                borderWidth: 0,
                data: [15, 18, 67, 34, 78],
                label: 'Sales Growth'
              }
            ]}
            id="barchart"
            labels={['Day 4', 'Day 8', 'Day 12', 'Day 16', 'Day 20']}
            options={{
              elements: { bar: { borderWidth: 0, width: 1 } },
              indexAxis: 'x',
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { usePointStyle: true }, pointStyle: 'line', position: '' },
                scales: { y: { beginAtZero: true } },
                title: { display: false, text: 'Daily Sales Growth' },
                tooltip: { usePointStyle: true }
              },
              responsive: true,
              scales: {
                x: {
                  border: { dash: [3, 3] },
                  grid: {
                    borderDash: [5, 5],
                    borderDashOffset: 2,
                    borderWidth: 1,
                    color: 'rgba(218, 221, 224, 0.8)',
                    drawBorder: true,
                    drawTicks: true,
                    tickBorderDash: [5, 5]
                  }
                },
                y: { display: true, grid: { display: false } }
              }
            }}
          />
        </div>
      </RdsWidget>
    </RdsCard>
  );
};

export default DailySalesGrowth;