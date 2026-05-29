import { useState } from 'react';
import RdsButton from '@raaghu/elements/rds-button/rds-button';
import RdsTextField from '@raaghu/elements/rds-text-field/rds-text-field';
import RdsCheckbox from '@raaghu/elements/rds-checkbox/rds-checkbox';
import RdsSwitch from '@raaghu/elements/rds-switch/rds-switch';
import RdsSelect from '@raaghu/elements/rds-select/rds-select';
import RdsAlert from '@raaghu/elements/rds-alert/rds-alert';
import RdsBadge from '@raaghu/elements/rds-badge/rds-badge';
import RdsProgress from '@raaghu/elements/rds-progress/rds-progress';
import RdsTypography from '@raaghu/elements/rds-typography/rds-typography';
import RdsTabs from '@raaghu/elements/rds-tabs/rds-tabs';
import '@raaghu/elements/rds-button/rds-button.scss';
import '@raaghu/elements/rds-text-field/rds-text-field.scss';
import '@raaghu/elements/rds-checkbox/rds-checkbox.scss';
import '@raaghu/elements/rds-switch/rds-switch.scss';
import '@raaghu/elements/rds-select/rds-select.scss';
import '@raaghu/elements/rds-alert/rds-alert.scss';
import '@raaghu/elements/rds-badge/rds-badge.scss';
import '@raaghu/elements/rds-progress/rds-progress.scss';
import '@raaghu/elements/rds-tabs/rds-tabs.scss';
import '../App.css';

export default function ElementsPage() {
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState(true);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div>
      <RdsTypography variant="h4" className="rds-demo-section-title">
        Elements
      </RdsTypography>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Buttons
        </RdsTypography>
        <div className="rds-demo-grid">
          <RdsButton text="Primary" color="primary" />
          <RdsButton text="Secondary" color="secondary" style="outlined" />
          <RdsButton text="Success" color="success" style="filled" />
          <RdsButton text="Error" color="error" style="outlined" />
        </div>
      </section>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Form controls
        </RdsTypography>
        <div className="rds-demo-grid">
          <RdsTextField label="Email" placeholder="you@example.com" />
          <RdsSelect
            label="Role"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
            ]}
          />
          <RdsCheckbox
            labeltext="Accept terms"
            status={checked ? 'checked' : 'unchecked'}
            onChange={(_, v) => setChecked(!!v)}
          />
          <RdsSwitch label="Notifications" checked={switchOn} onChange={(_, v) => setSwitchOn(!!v)} />
        </div>
      </section>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Feedback
        </RdsTypography>
        <div className="rds-demo-grid">
          <RdsAlert type="success">Operation completed successfully.</RdsAlert>
          <RdsAlert type="warning">Please review your settings.</RdsAlert>
          <RdsBadge badgeContent={12} color="primary">
            <RdsTypography variant="body1">Inbox</RdsTypography>
          </RdsBadge>
          <RdsProgress variant="determinate" value={65} />
        </div>
      </section>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Tabs
        </RdsTypography>
        <RdsTabs
          tabs={[
            { id: 0, label: 'Overview' },
            { id: 1, label: 'Details' },
            { id: 2, label: 'History' },
          ]}
          value={tab}
          onChange={(_, v) => setTab(v as number)}
        />
      </section>
    </div>
  );
}
