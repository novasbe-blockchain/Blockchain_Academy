import { Outlet, useLocation } from 'react-router';
import { CourseNav, type Section } from './components/navigation/CourseNav';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';

const BASE = '/project-management';

const sections: Section[] = [
  { id: 'home', number: '🏠', label: 'section.home',          path: BASE },
  { id: 'lo',   number: '🎯', label: 'section.objectives',    path: `${BASE}/learning-objectives` },
  { id: '1',    number: '01', label: 'section.pm.intro',      path: `${BASE}/section-1` },
  { id: '2',    number: '02', label: 'section.pm.planning',   path: `${BASE}/section-2` },
  { id: '3',    number: '03', label: 'section.pm.risk',       path: `${BASE}/section-3` },
  { id: '4',    number: '04', label: 'section.pm.communication', path: `${BASE}/section-4` },
  { id: '5',    number: '05', label: 'section.pm.leadership', path: `${BASE}/section-5` },
  { id: 'end',  number: '🏁', label: 'section.conclusion',    path: `${BASE}/conclusion` },
  { id: 'bib',  number: '📖', label: 'section.bibliography',  path: `${BASE}/bibliography` },
];

export function ProjectManagementRoot() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '');
  const currentIdx = sections.findIndex(s => s.path === normalizedPath);
  const nextChapterPath = currentIdx >= 0 && currentIdx < sections.length - 1
    ? sections[currentIdx + 1].path : undefined;

  return (
    <div className="h-full w-full flex flex-col">
      <CourseNav base={BASE} sections={sections} accentColor="#f97316" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <SlideNavButtons nextChapterPath={nextChapterPath} />
    </div>
  );
}
