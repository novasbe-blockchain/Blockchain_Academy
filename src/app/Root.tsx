import { Outlet, useLocation } from 'react-router';
import { CourseNav, type Section } from './components/navigation/CourseNav';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';

const BASE = '/blockchain-fundamentals';

const sections: Section[] = [
  { id: 'home', number: '🏠', label: 'section.home',         path: BASE },
  { id: 'lo',   number: '🎯', label: 'section.objectives',   path: `${BASE}/learning-objectives` },
  { id: 'cs',   number: '🗺️', label: 'section.summary',      path: `${BASE}/course-summary` },
  { id: '0',    number: '00', label: 'section.prologue',     path: `${BASE}/prologue` },
  { id: '1',    number: '01', label: 'section.bf.intro',     path: `${BASE}/section-1` },
  { id: '2',    number: '02', label: 'section.bf.bitcoin',   path: `${BASE}/section-2` },
  { id: '3',    number: '03', label: 'section.bf.whatsNext', path: `${BASE}/section-3` },
  { id: 'bib',  number: '📖', label: 'section.bibliography', path: `${BASE}/bibliography` },
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
