import { Outlet } from 'react-router';
import { useSlideKeyNav } from './hooks/useSlideKeyNav';
import { SlideNavTip } from './components/navigation/SlideNavTip';

export function AcademyRoot() {
  useSlideKeyNav();

  return (
    <div className="h-full w-full">
      <Outlet />
      <SlideNavTip />
    </div>
  );
}
