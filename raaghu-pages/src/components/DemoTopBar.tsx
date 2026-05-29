import RdsAppBar from '@raaghu/elements/rds-app-bar/rds-app-bar';
import RdsButton from '@raaghu/elements/rds-button/rds-button';
import RdsBadge from '@raaghu/elements/rds-badge/rds-badge';
import { ProfileMenu } from '@raaghu/elements/shared/components/ProfileMenu';
import { useRaaghuTheme } from '@raaghu/themes/src/provider/RaaghuThemeProvider';
import { Notifications as BellIcon } from '@mui/icons-material';

const LOGO_URL =
  'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png';

export interface DemoTopBarProps {
  onMenuClick?: () => void;
}

export default function DemoTopBar({ onMenuClick }: DemoTopBarProps) {
  const { toggleMode, isDark } = useRaaghuTheme();

  return (
    <div className="rds-appshell-appbar rds-appshell-appbar--fixed">
      <RdsAppBar
        color="default"
        logo={<img alt="Raaghu" className="rds-story-logo" src={LOGO_URL} />}
        showLogo
        showMenuButton
        onMenuClick={onMenuClick}
        showSearch={false}
        title="Raaghu Demo"
        rightActions={
          <>
            <RdsButton style="outlined" size="small" onClick={toggleMode} text={isDark ? 'Light mode' : 'Dark mode'}>
            </RdsButton>
            <RdsBadge badgeContent={3} color="error">
              <BellIcon />
            </RdsBadge>
            <ProfileMenu email="demo@raaghu.design" name="Demo User" />
          </>
        }
      />
    </div>
  );
}
