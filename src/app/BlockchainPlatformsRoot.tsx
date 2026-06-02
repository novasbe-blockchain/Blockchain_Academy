import { Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CourseNav } from './components/navigation/CourseNav';
import { ScrollProgressBar } from './components/navigation/ScrollProgressBar';
import { SlideNavButtons } from './components/navigation/SlideNavButtons';
import { useLang } from '../i18n/useLang';

export function BlockchainPlatformsRoot() {
  const location = useLocation();
  const lang = useLang();
  const { t } = useTranslation();

  const BASE = `/${lang}/blockchain-platforms`;
  const sections = [
    { id: 'home', number: '🏠', label: t('sections.home'),             path: BASE },
    { id: 'lo',   number: '🎯', label: t('sections.objectives'),       path: `${BASE}/learning-objectives` },
    { id: '0',    number: '00', label: t('sections.recap'),            path: `${BASE}/section-0` },
    { id: '1',    number: '01', label: t('sections.bitcoin'),          path: `${BASE}/section-1` },
    { id: '2',    number: '02', label: t('sections.ethereum'),         path: `${BASE}/section-2` },
    { id: '3',    number: '03', label: t('sections.hyperledger'),      path: `${BASE}/section-3` },
    { id: '4',    number: '04', label: t('sections.interoperability'), path: `${BASE}/section-4` },
    { id: '5',    number: '05', label: t('sections.newTrends'),        path: `${BASE}/section-5` },
    { id: 'end',  number: '🏁', label: t('sections.conclusion'),       path: `${BASE}/conclusion` },
    { id: 'bib',  number: '📖', label: t('sections.bibliography'),     path: `${BASE}/bibliography` },
  ];

  const normalizedPath = location.pathname.replace(/\/$/, '');
  const currentIdx = sections.findIndex(s => s.path === normalizedPath);
  const nextChapterPath = currentIdx >= 0 && currentIdx < sections.length - 1
    ? sections[currentIdx + 1].path : undefined;

  return (
    <div className="h-full w-full flex flex-col">
      <CourseNav base={BASE} sections={sections} accentColor="#39B54A" />
      <ScrollProgressBar accentColor="#39B54A" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <SlideNavButtons nextChapterPath={nextChapterPath} />
    </div>
  );
}
