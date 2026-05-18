import { Outlet } from 'react-router';
import { useSlideKeyNav } from './hooks/useSlideKeyNav';
import { SlideNavTip } from './components/navigation/SlideNavTip';
import { LanguageProvider } from './i18n';

export function AcademyRoot() {
  useSlideKeyNav();

  return (
    <LanguageProvider>
      <div className="h-full w-full">
        <Outlet />
        <SlideNavTip />
      </div>
    </LanguageProvider>
  );
}
