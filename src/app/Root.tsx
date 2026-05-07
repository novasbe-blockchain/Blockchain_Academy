import { Outlet, useLocation } from 'react-router';
import { CourseNav } from './components/navigation/CourseNav';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';

const BASE = '/blockchain-fundamentals';

const sections = [
  { id: 'home', number: '🏠', label: 'Home',         path: BASE },
  { id: 'lo',   number: '🎯', label: 'Objectives',  path: `${BASE}/learning-objectives` },
  { id: 'cs',   number: '🗺️', label: 'Summary',     path: `${BASE}/course-summary` },
  { id: '0',    number: '00', label: 'Prologue',     path: `${BASE}/prologue` },
  { id: '1',    number: '01', label: 'Intro',        path: `${BASE}/section-1` },
  { id: '2',    number: '02', label: 'Bitcoin',      path: `${BASE}/section-2` },
  { id: '3',    number: '03', label: "What's Next",  path: `${BASE}/section-3` },
  { id: 'bib',  number: '📖', label: 'Bibliography', path: `${BASE}/bibliography` },
];

export function Root() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '');
  const currentIdx = sections.findIndex(s => s.path === normalizedPath);
  const nextChapterPath = currentIdx >= 0 && currentIdx < sections.length - 1
    ? sections[currentIdx + 1].path : undefined;

  return (
    <div className="h-full w-full flex flex-col">
      <CourseNav />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <SlideNavButtons nextChapterPath={nextChapterPath} />
    </div>
  );
}
