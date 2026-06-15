import RdsTypography from '@raaghu/elements/rds-typography/rds-typography';
import '@raaghu/elements/rds-typography/rds-typography.scss';

export default function HomePage() {
  return (
    <div className="welcome">
      <img alt="" className="welcome__logo" src="/favicon.svg" />
      <RdsTypography variant="h4" align="center">
        Start creating your application using Raaghu Design System
      </RdsTypography>
    </div>
  );
}
