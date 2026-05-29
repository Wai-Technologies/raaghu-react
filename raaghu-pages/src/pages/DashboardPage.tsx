import RdsAlert from '@raaghu/elements/rds-alert/rds-alert';
import RdsCard from '@raaghu/elements/rds-card/rds-card';
import RdsTypography from '@raaghu/elements/rds-typography/rds-typography';
import RdsCompContribution from '@raaghu/components/rds-comp-contribution/rds-comp-contribution';
import RdsCompEmptyState from '@raaghu/components/rds-comp-empty-state/rds-comp-empty-state';
import '@raaghu/elements/rds-alert/rds-alert.scss';
import '@raaghu/elements/rds-card/rds-card.scss';
import '@raaghu/elements/rds-typography/rds-typography.scss';
import '@raaghu/components/rds-comp-contribution/rds-comp-contribution.scss';
import '@raaghu/components/rds-comp-empty-state/rds-comp-empty-state.scss';
import '../App.css';

const contributionValues: Record<string, number> = {};
const today = new Date();
for (let i = 0; i < 90; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const key = d.toISOString().slice(0, 10);
  contributionValues[key] = Math.floor(Math.random() * 4);
}

export default function DashboardPage() {
  return (
    <div>
      <RdsTypography variant="h4" className="rds-demo-section-title">
        Dashboard
      </RdsTypography>

      <RdsAlert type="info" className="rds-demo-section">
        Welcome to the Raaghu design system demo. Toggle light/dark mode from the top bar.
      </RdsAlert>

      <div className="rds-demo-card-row">
        <RdsCard>
          <RdsTypography variant="h6">Active users</RdsTypography>
          <RdsTypography variant="h3">1,284</RdsTypography>
        </RdsCard>
        <RdsCard>
          <RdsTypography variant="h6">Open tasks</RdsTypography>
          <RdsTypography variant="h3">42</RdsTypography>
        </RdsCard>
        <RdsCard>
          <RdsTypography variant="h6">Completion rate</RdsTypography>
          <RdsTypography variant="h3">87%</RdsTypography>
        </RdsCard>
      </div>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Activity
        </RdsTypography>
        <RdsCompContribution
          values={contributionValues}
          until={today.toISOString().slice(0, 10)}
        />
      </section>

      <section className="rds-demo-section">
        <RdsCompEmptyState
          label="No recent reports"
          subLabel="Create a report from the components page to see it here."
        />
      </section>
    </div>
  );
}
