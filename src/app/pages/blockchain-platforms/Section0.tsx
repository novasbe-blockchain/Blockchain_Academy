import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { RefreshCw } from 'lucide-react';

// Language-neutral shape — only IDs. Labels come from t() at render time.
const chapterIds = [
  's0-centralization',
  's0-types',
  's0-permissioned',
  's0-comparison',
  's0-usecases',
  's0-takeaways',
  's0-team-reminder',
] as const;

interface ComparisonRow {
  feature: string;
  option1: string;
  option2: string;
  option3?: string;
}

interface UsecaseDriver {
  label: string;
  text: string;
}

export function Section0() {
  const { t } = useTranslation('blockchain-platforms/section-0');

  const chapters = useMemo(
    () => chapterIds.map((id) => ({ id, label: t(`chapters.${id}`) })),
    [t]
  );

  const centralizedPoints = t('centralization.centralized.points', { returnObjects: true }) as string[];
  const decentralizedPoints = t('centralization.decentralized.points', { returnObjects: true }) as string[];
  const distributedPoints = t('centralization.distributed.points', { returnObjects: true }) as string[];

  const typesItems = t('types.items', { returnObjects: true }) as ComparisonRow[];
  const comparisonItems = t('comparison.items', { returnObjects: true }) as ComparisonRow[];

  const permissionedKeyPoints = t('permissioned.keyPoints', { returnObjects: true }) as string[];

  const useItems = t('usecases.use.items', { returnObjects: true }) as string[];
  const dontUseItems = t('usecases.dontUse.items', { returnObjects: true }) as string[];
  const driverItems = t('usecases.drivers.items', { returnObjects: true }) as UsecaseDriver[];

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<RefreshCw className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ CENTRALIZATION ═══════ */}
        <div id="s0-centralization" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('centralization.heading')}</h2>
            <p className="text-sm text-muted-foreground">{t('centralization.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* Centralized */}
            <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🏛️</div>
              <h3 className="font-bold text-[#ED1C24] text-base">{t('centralization.centralized.title')}</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <div className="size-8 rounded-full bg-[#ED1C24]/30 border-2 border-[#ED1C24] flex items-center justify-center z-10">
                  <span className="text-xs font-black text-[#ED1C24]">C</span>
                </div>
                {[[-36,-24],[36,-24],[-36,24],[36,24]].map(([x,y],i) => (
                  <div key={i} className="absolute size-5 rounded-full bg-muted border border-border flex items-center justify-center" style={{ left: `calc(50% + ${x}px - 10px)`, top: `calc(50% + ${y}px - 10px)` }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg className="absolute" width="72" height="52" style={{ left: `${-x}px`, top: `${-y}px`, position: 'relative' }}/>
                    </div>
                  </div>
                ))}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  {[[-18,-12],[18,-12],[-18,12],[18,12]].map(([x,y],i) => (
                    <line key={i} x1="56" y1="40" x2={56+x*2} y2={40+y*2} stroke="#ED1C24" strokeWidth="1.5" strokeOpacity="0.5"/>
                  ))}
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                {centralizedPoints.map((point, i) => (
                  <li key={i} className={i === centralizedPoints.length - 1 ? 'font-medium text-foreground' : undefined}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Decentralized */}
            <div className="bg-card border border-[#f59e0b]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🕸️</div>
              <h3 className="font-bold text-[#f59e0b] text-base">{t('centralization.decentralized.title')}</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  <circle cx="56" cy="28" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <circle cx="30" cy="56" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <circle cx="82" cy="56" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <line x1="56" y1="36" x2="38" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <line x1="56" y1="36" x2="74" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <line x1="38" y1="56" x2="74" y2="56" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                {decentralizedPoints.map((point, i) => (
                  <li key={i} className={i === decentralizedPoints.length - 1 ? 'font-medium text-foreground' : undefined}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Distributed */}
            <div className="bg-card border border-[#39B54A]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🌐</div>
              <h3 className="font-bold text-[#39B54A] text-base">{t('centralization.distributed.title')}</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  {[[56,20],[28,40],[84,40],[42,64],[70,64],[14,60],[98,60]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="7" fill="none" stroke="#39B54A" strokeWidth="2" opacity="0.7"/>
                  ))}
                  {[[56,20,28,40],[56,20,84,40],[28,40,42,64],[84,40,70,64],[28,40,14,60],[84,40,98,60],[42,64,70,64]].map(([x1,y1,x2,y2],i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#39B54A" strokeWidth="1.5" strokeOpacity="0.35"/>
                  ))}
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                {distributedPoints.map((point, i) => (
                  <li key={i} className={i === distributedPoints.length - 1 ? 'font-medium text-foreground' : undefined}>{point}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ═══════ BLOCKCHAIN TYPES ═══════ */}
        <div id="s0-types" className="h-full">
          <ComparisonSlide
            title={t('types.title')}
            featureLabel={t('types.featureLabel')}
            option1Label={t('types.option1Label')}
            option2Label={t('types.option2Label')}
            option3Label={t('types.option3Label')}
            items={typesItems}
          />
        </div>

        {/* ═══════ PERMISSIONED BLOCKCHAINS ═══════ */}
        <div id="s0-permissioned" className="h-full">
          <ConceptSlide
            title={t('permissioned.title')}
            description={t('permissioned.description')}
            visual={
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-xl border border-[#8b5cf6]/30">
                  <h4 className="font-bold text-[#8b5cf6] mb-2">{t('permissioned.cards.what.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('permissioned.cards.what.body')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                  <h4 className="font-bold text-[#ED1C24] mb-2">{t('permissioned.cards.private.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('permissioned.cards.private.body')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                  <h4 className="font-bold text-[#39B54A] mb-2">{t('permissioned.cards.consortium.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('permissioned.cards.consortium.body')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                  <h4 className="font-bold text-[#6366f1] mb-2">{t('permissioned.cards.tradeoff.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">{t('permissioned.cards.tradeoff.gainLabel')}</span>
                    {t('permissioned.cards.tradeoff.gain')}
                    <span className="text-foreground font-medium">{t('permissioned.cards.tradeoff.loseLabel')}</span>
                    {t('permissioned.cards.tradeoff.lose')}
                  </p>
                </div>
              </div>
            }
            keyPoints={permissionedKeyPoints}
          />
        </div>

        {/* ═══════ COMPARISON ═══════ */}
        <div id="s0-comparison" className="h-full">
          <ComparisonSlide
            title={t('comparison.title')}
            featureLabel={t('comparison.featureLabel')}
            option1Label={t('comparison.option1Label')}
            option2Label={t('comparison.option2Label')}
            items={comparisonItems}
          />
        </div>

        {/* ═══════ USE OF BLOCKCHAIN ═══════ */}
        <div id="s0-usecases" className="h-full flex items-center justify-center p-5 lg:p-8">
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 text-center">{t('usecases.heading')}</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">{t('usecases.subtitle')}</p>

            <div className="grid grid-cols-3 gap-5">
              <div className="bg-card border border-[#39B54A]/40 rounded-xl p-7">
                <div className="font-bold text-[#39B54A] text-base mb-5">{t('usecases.use.title')}</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {useItems.map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-7">
                <div className="font-bold text-[#ED1C24] text-base mb-5">{t('usecases.dontUse.title')}</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {dontUseItems.map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-[#f59e0b]/40 rounded-xl p-7">
                <div className="font-bold text-[#f59e0b] text-base mb-5">{t('usecases.drivers.title')}</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {driverItems.map((driver, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#f59e0b] shrink-0">•</span>
                      <span><span className="font-medium text-foreground">{driver.label}</span>{driver.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s0-takeaways" className="h-full">
          <TakeawaySlide
            title={t('takeaways.title')}
            takeaways={takeawayItems}
          />
        </div>

        {/* ═══════ TEAM REMINDER (Course 03 starts) ═══════ */}
        <div id="s0-team-reminder" className="h-full flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(circle at 30% 20%, #6366f124, transparent 60%), radial-gradient(circle at 70% 80%, #8b5cf624, transparent 60%)' }} />
          <div className="relative z-10 max-w-3xl w-full p-8 bg-card border-2 rounded-2xl text-center" style={{ borderColor: '#6366f160' }}>
            <div className="inline-flex px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-md mb-4"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              {t('teamReminder.badge')}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{t('teamReminder.heading')}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-2xl mx-auto">
              {t('teamReminder.leadA')}<strong className="text-foreground">{t('teamReminder.leadStrong1')}</strong>{t('teamReminder.leadB')}<strong className="text-foreground">{t('teamReminder.leadStrong2')}</strong>{t('teamReminder.leadC')}<strong className="text-foreground">{t('teamReminder.leadStrong3')}</strong>{t('teamReminder.leadD')}
            </p>
            <div className="grid grid-cols-3 gap-3 text-left mt-6">
              <div className="p-3 rounded-xl border" style={{ borderColor: '#39B54A40', backgroundColor: '#39B54A0c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#39B54A] mb-1">{t('teamReminder.ifYes.label')}</div>
                <div className="text-xs text-muted-foreground">{t('teamReminder.ifYes.body')}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: '#f59e0b40', backgroundColor: '#f59e0b0c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] mb-1">{t('teamReminder.ifNotYet.label')}</div>
                <div className="text-xs text-muted-foreground">{t('teamReminder.ifNotYet.body')}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: '#6366f140', backgroundColor: '#6366f10c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1] mb-1">{t('teamReminder.todaysLink.label')}</div>
                <div className="text-xs text-muted-foreground">{t('teamReminder.todaysLink.body')}</div>
              </div>
            </div>
          </div>
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
