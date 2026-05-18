import { Outlet, useLocation } from 'react-router';
import { CourseNav, type Section } from './components/navigation/CourseNav';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';

const BASE = '/smart-contracts';

const sections: Section[] = [
  { id: 'home', number: '🏠', label: 'section.home',              path: BASE },
  { id: 'lo',   number: '🎯', label: 'section.objectives',        path: `${BASE}/learning-objectives` },
  { id: '1',    number: '01', label: 'section.sc.intro',          path: `${BASE}/section-1` },
  { id: '2',    number: '02', label: 'section.sc.howItWorks',     path: `${BASE}/section-2` },
  { id: '3',    number: '03', label: 'section.sc.industries',     path: `${BASE}/section-3` },
  { id: '4',    number: '04', label: 'section.sc.criticalThinking', path: `${BASE}/section-4` },
  { id: '5',    number: '05', label: 'section.sc.limitations',    path: `${BASE}/section-5` },
  { id: '6',    number: '06', label: 'section.sc.build',          path: `${BASE}/section-6` },
  { id: '7',    number: '07', label: 'section.sc.teamProject',    path: `${BASE}/section-7` },
  { id: 'end',  number: '🏁', label: 'section.conclusion',        path: `${BASE}/conclusion` },
  { id: 'bib',  number: '📖', label: 'section.bibliography',      path: `${BASE}/bibliography` },
];

export function SmartContractsRoot() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '');
  const currentIdx = sections.findIndex(s => s.path === normalizedPath);
  const nextChapterPath = currentIdx >= 0 && currentIdx < sections.length - 1
    ? sections[currentIdx + 1].path : undefined;

  return (
    <div className="h-full w-full flex flex-col">
      <CourseNav base={BASE} sections={sections} accentColor="#6366f1" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <SlideNavButtons nextChapterPath={nextChapterPath} />
    </div>
  );
}
