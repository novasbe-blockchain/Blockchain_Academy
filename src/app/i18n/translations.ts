/**
 * Translation dictionaries for the academy.
 *
 * Keep keys flat and dot-namespaced. When you add slide-content keys, use a
 * `slide.<course>.<section>.<key>` prefix so they stay grouped.
 *
 * To add a new locale: add the key to the `Lang` union, add a sibling object
 * in `translations`, and TypeScript will tell you which keys are missing.
 */

export type Lang = 'en' | 'pt';

const en = {
  // --- Common --------------------------------------------------------------
  'common.start': 'Start Course',
  'common.comingSoon': 'Coming Soon',

  // --- Homepage / course selection ----------------------------------------
  'home.title': 'Blockchain Academy',
  'home.tagline': 'Four courses. One complete mastery path. Choose where to begin.',

  // --- Course meta (titles, descriptions, topic chips) --------------------
  'course.01.title': 'Blockchain Fundamentals',
  'course.01.description':
    'Understand how blockchain technology works from the ground up — cryptography, consensus, Bitcoin, and the Web3 ecosystem.',
  'course.01.topic.1': 'DLT & Hashing',
  'course.01.topic.2': 'Bitcoin & Mining',
  'course.01.topic.3': 'Wallets & Transactions',
  'course.01.topic.4': 'Consensus Mechanisms',
  'course.01.topic.5': 'Web3 & dApps',

  'course.02.title': 'Blockchain Platforms',
  'course.02.description':
    'Bitcoin, Ethereum, Hyperledger Fabric, and interoperability — understand the trade-offs of each platform and when to use which.',
  'course.02.topic.1': 'Bitcoin Architecture',
  'course.02.topic.2': 'Ethereum & EVM',
  'course.02.topic.3': 'Hyperledger Fabric',
  'course.02.topic.4': 'Interoperability',
  'course.02.topic.5': 'Cosmos & Layer 0',

  'course.03.title': 'Business Applications for Smart Contracts',
  'course.03.description':
    'From theory to industry disruption — understand what smart contracts can and cannot do for your business, with real case studies and a team project.',
  'course.03.topic.1': 'Smart Contract Fundamentals',
  'course.03.topic.2': 'EVM & Web3 Landscape',
  'course.03.topic.3': 'Case Studies',
  'course.03.topic.4': 'Oracle Problem',
  'course.03.topic.5': 'Team Project',

  'course.04.title': 'Project Management for Blockchain Initiatives',
  'course.04.description':
    'Plan, execute, and lead blockchain projects — from scoping and governance to risk management, team leadership, and measuring success.',
  'course.04.topic.1': 'Project Lifecycle',
  'course.04.topic.2': 'Scope & Governance',
  'course.04.topic.3': 'Risk & Audits',
  'course.04.topic.4': 'Communication',
  'course.04.topic.5': 'Team Leadership',

  // --- Course nav ---------------------------------------------------------
  'nav.allCourses': 'All Courses',
  'nav.coursesShort': 'Courses',
  'nav.darkMode': 'Dark Mode',
  'nav.lightMode': 'Light Mode',
  'nav.switchToPortuguese': 'Switch to Portuguese',
  'nav.switchToEnglish': 'Switch to English',

  // --- Section labels (shared across courses) -----------------------------
  'section.home': 'Home',
  'section.objectives': 'Objectives',
  'section.summary': 'Summary',
  'section.prologue': 'Prologue',
  'section.bibliography': 'Bibliography',
  'section.conclusion': 'Conclusion',

  // Course 01 — Blockchain Fundamentals
  'section.bf.intro': 'Intro',
  'section.bf.bitcoin': 'Bitcoin',
  'section.bf.whatsNext': "What's Next",

  // Course 02 — Smart Contracts
  'section.sc.intro': 'Intro',
  'section.sc.howItWorks': 'How It Works',
  'section.sc.industries': 'Industries & Cases',
  'section.sc.criticalThinking': 'Critical Thinking',
  'section.sc.limitations': 'Limitations',
  'section.sc.build': 'Build',
  'section.sc.teamProject': 'Team Project',

  // Course 03 — Blockchain Platforms
  'section.bp.recap': 'Recap',
  'section.bp.bitcoin': 'Bitcoin',
  'section.bp.ethereum': 'Ethereum',
  'section.bp.hyperledger': 'Hyperledger',
  'section.bp.interoperability': 'Interoperability',
  'section.bp.newTrends': 'New Trends',

  // Course 04 — Project Management
  'section.pm.intro': 'Introduction',
  'section.pm.planning': 'Planning',
  'section.pm.risk': 'Risk',
  'section.pm.communication': 'Communication',
  'section.pm.leadership': 'Leadership',

  // --- Slide-deck navigation ---------------------------------------------
  'slideNav.previous': 'Previous slide',
  'slideNav.next': 'Next slide',
  'slideNav.nextChapter': 'Next chapter',
  'slideNav.goToNextChapter': 'Go to next chapter',

  // --- Section sidebar (chapter list) ------------------------------------
  'sectionNav.expand': 'Expand chapter sidebar',
  'sectionNav.collapse': 'Collapse chapter sidebar',

  // --- Floating "arrow keys" tip ------------------------------------------
  'slideNavTip.title': 'Arrow keys to navigate',
  'slideNavTip.subtitle': 'Press ↑ or ↓ to move between slides',
  'slideNavTip.dismiss': 'Dismiss navigation hint',
} as const;

export type TranslationKey = keyof typeof en;

const pt: Record<TranslationKey, string> = {
  // --- Common --------------------------------------------------------------
  'common.start': 'Iniciar curso',
  'common.comingSoon': 'Em breve',

  // --- Homepage / course selection ----------------------------------------
  'home.title': 'Blockchain Academy',
  'home.tagline': 'Quatro cursos. Um caminho completo até à mestria. Escolha por onde começar.',

  // --- Course meta --------------------------------------------------------
  'course.01.title': 'Fundamentos de Blockchain',
  'course.01.description':
    'Compreenda como a tecnologia blockchain funciona desde a raiz — criptografia, consenso, Bitcoin e o ecossistema Web3.',
  'course.01.topic.1': 'DLT e Hashing',
  'course.01.topic.2': 'Bitcoin e Mineração',
  'course.01.topic.3': 'Carteiras e Transações',
  'course.01.topic.4': 'Mecanismos de Consenso',
  'course.01.topic.5': 'Web3 e dApps',

  'course.02.title': 'Plataformas Blockchain',
  'course.02.description':
    'Bitcoin, Ethereum, Hyperledger Fabric e interoperabilidade — compreenda os trade-offs de cada plataforma e quando usar qual.',
  'course.02.topic.1': 'Arquitetura do Bitcoin',
  'course.02.topic.2': 'Ethereum e EVM',
  'course.02.topic.3': 'Hyperledger Fabric',
  'course.02.topic.4': 'Interoperabilidade',
  'course.02.topic.5': 'Cosmos e Layer 0',

  'course.03.title': 'Aplicações Empresariais de Smart Contracts',
  'course.03.description':
    'Da teoria à disrupção da indústria — perceba o que os smart contracts podem e não podem fazer pelo seu negócio, com casos reais e um projeto de equipa.',
  'course.03.topic.1': 'Fundamentos de Smart Contracts',
  'course.03.topic.2': 'EVM e Panorama Web3',
  'course.03.topic.3': 'Casos de Estudo',
  'course.03.topic.4': 'Problema do Oráculo',
  'course.03.topic.5': 'Projeto de Equipa',

  'course.04.title': 'Gestão de Projetos para Iniciativas Blockchain',
  'course.04.description':
    'Planeie, execute e lidere projetos blockchain — do enquadramento e governança à gestão de risco, liderança de equipas e medição de sucesso.',
  'course.04.topic.1': 'Ciclo de Vida do Projeto',
  'course.04.topic.2': 'Escopo e Governança',
  'course.04.topic.3': 'Risco e Auditorias',
  'course.04.topic.4': 'Comunicação',
  'course.04.topic.5': 'Liderança de Equipa',

  // --- Course nav ---------------------------------------------------------
  'nav.allCourses': 'Todos os cursos',
  'nav.coursesShort': 'Cursos',
  'nav.darkMode': 'Modo escuro',
  'nav.lightMode': 'Modo claro',
  'nav.switchToPortuguese': 'Mudar para português',
  'nav.switchToEnglish': 'Mudar para inglês',

  // --- Section labels (shared) --------------------------------------------
  'section.home': 'Início',
  'section.objectives': 'Objetivos',
  'section.summary': 'Resumo',
  'section.prologue': 'Prólogo',
  'section.bibliography': 'Bibliografia',
  'section.conclusion': 'Conclusão',

  // Course 01
  'section.bf.intro': 'Introdução',
  'section.bf.bitcoin': 'Bitcoin',
  'section.bf.whatsNext': 'O que se segue',

  // Course 02
  'section.sc.intro': 'Introdução',
  'section.sc.howItWorks': 'Como Funciona',
  'section.sc.industries': 'Indústrias e Casos',
  'section.sc.criticalThinking': 'Pensamento Crítico',
  'section.sc.limitations': 'Limitações',
  'section.sc.build': 'Construir',
  'section.sc.teamProject': 'Projeto de Equipa',

  // Course 03
  'section.bp.recap': 'Revisão',
  'section.bp.bitcoin': 'Bitcoin',
  'section.bp.ethereum': 'Ethereum',
  'section.bp.hyperledger': 'Hyperledger',
  'section.bp.interoperability': 'Interoperabilidade',
  'section.bp.newTrends': 'Novas Tendências',

  // Course 04
  'section.pm.intro': 'Introdução',
  'section.pm.planning': 'Planeamento',
  'section.pm.risk': 'Risco',
  'section.pm.communication': 'Comunicação',
  'section.pm.leadership': 'Liderança',

  // --- Slide-deck navigation ---------------------------------------------
  'slideNav.previous': 'Slide anterior',
  'slideNav.next': 'Próximo slide',
  'slideNav.nextChapter': 'Próximo capítulo',
  'slideNav.goToNextChapter': 'Ir para o próximo capítulo',

  // --- Section sidebar ----------------------------------------------------
  'sectionNav.expand': 'Expandir barra lateral de capítulos',
  'sectionNav.collapse': 'Recolher barra lateral de capítulos',

  // --- Floating tip -------------------------------------------------------
  'slideNavTip.title': 'Setas para navegar',
  'slideNavTip.subtitle': 'Pressione ↑ ou ↓ para mudar de slide',
  'slideNavTip.dismiss': 'Dispensar dica de navegação',
};

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  en,
  pt,
};
