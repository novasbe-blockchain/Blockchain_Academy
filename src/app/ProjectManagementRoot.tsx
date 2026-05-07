import { Outlet, useLocation } from 'react-router';
import { CourseNav } from './components/navigation/CourseNav';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';

const BASE = '/project-management';

const sections = [
  { id: 'home', number: '🏠', label: 'Home',          path: BASE },
  { id: 'lo',   number: '🎯', label: 'Objectives',   path: `${BASE}/learning-objectives` },
  { id: '1',    number: '01', label: 'Introduction',  path: `${BASE}/section-1` },
  { id: '2',    number: '02', label: 'Planning',      path: `${BASE}/section-2` },
  { id: '3',    number: '03', label: 'Risk',          path: `${BASE}/section-3` },
  { id: '4',    number: '04', label: 'Communication', path: `${BASE}/section-4` },
  { id: '5',    number: '05', label: 'Leadership',    path: `${BASE}/section-5` },
  { id: 'end',  number: '🏁', label: 'Conclusion',    path: `${BASE}/conclusion` },
  { id: 'bib',  number: '📖', label: 'Bibliography',  path: `${BASE}/bibliography` },
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
