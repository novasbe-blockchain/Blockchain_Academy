import { createBrowserRouter, redirect } from "react-router";
import { AcademyRoot } from "./AcademyRoot";
import { Root } from "./Root";
import { BlockchainPlatformsRoot } from "./BlockchainPlatformsRoot";
import { SmartContractsRoot } from "./SmartContractsRoot";
import { CourseSelection } from "./pages/CourseSelection";
import { Home } from "./pages/Home";
import { LearningObjectives } from "./pages/LearningObjectives";
import { CourseSummary } from "./pages/CourseSummary";
import { Prologue } from "./pages/Prologue";
import { Section1 } from "./pages/Section1";
import { Section2 } from "./pages/Section2";
import { Section3 } from "./pages/Section3";
import { DesignSystem } from "./pages/DesignSystem";
import { QuickReference } from "./pages/QuickReference";
import { Bibliography } from "./pages/Bibliography";
import { BlockchainPlatformsHome } from "./pages/blockchain-platforms/Home";
import { BP_LearningObjectives } from "./pages/blockchain-platforms/LearningObjectives";
import { Section0 } from "./pages/blockchain-platforms/Section0";
import { BP_Section1 } from "./pages/blockchain-platforms/Section1";
import { BP_Section2 } from "./pages/blockchain-platforms/Section2";
import { BP_Section3 } from "./pages/blockchain-platforms/Section3";
import { BP_Section4 } from "./pages/blockchain-platforms/Section4";
import { BP_Section5 } from "./pages/blockchain-platforms/Section5";
import { Conclusion } from "./pages/blockchain-platforms/Conclusion";
import { BP_Bibliography } from "./pages/blockchain-platforms/Bibliography";
import { SmartContractsHome } from "./pages/smart-contracts/Home";
import { SC_LearningObjectives } from "./pages/smart-contracts/LearningObjectives";
import { SC_Section1 } from "./pages/smart-contracts/Section1";
import { SC_Section2 } from "./pages/smart-contracts/Section2";
import { SC_Section3 } from "./pages/smart-contracts/Section3";
import { SC_Section4 } from "./pages/smart-contracts/Section4";
import { SC_Section5 } from "./pages/smart-contracts/Section5";
import { SC_Conclusion } from "./pages/smart-contracts/Conclusion";
import { SC_Bibliography } from "./pages/smart-contracts/Bibliography";
import { ProjectManagementRoot } from "./ProjectManagementRoot";
import { ProjectManagementHome } from "./pages/project-management/Home";
import { PM_LearningObjectives } from "./pages/project-management/LearningObjectives";
import { PM_Section1 } from "./pages/project-management/Section1";
import { PM_Section2 } from "./pages/project-management/Section2";
import { PM_Section3 } from "./pages/project-management/Section3";
import { PM_Section4 } from "./pages/project-management/Section4";
import { PM_Section5 } from "./pages/project-management/Section5";
import { PM_Conclusion } from "./pages/project-management/Conclusion";
import { PM_Bibliography } from "./pages/project-management/Bibliography";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AcademyRoot,
    children: [
      // Academy landing — course selection
      { index: true, Component: CourseSelection },

      // Course 01 — Blockchain Fundamentals
      {
        path: "blockchain-fundamentals",
        Component: Root,
        children: [
          { index: true, Component: Home },
          { path: "learning-objectives", Component: LearningObjectives },
          { path: "course-summary", Component: CourseSummary },
          { path: "prologue", Component: Prologue },
          { path: "section-1", Component: Section1 },
          { path: "section-2", Component: Section2 },
          { path: "section-3", Component: Section3 },
          { path: "design-system", Component: DesignSystem },
          { path: "quick-reference", Component: QuickReference },
          { path: "bibliography", Component: Bibliography },
        ],
      },

      // Course 02 — Smart Contracts
      {
        path: "smart-contracts",
        Component: SmartContractsRoot,
        children: [
          { index: true, Component: SmartContractsHome },
          { path: "learning-objectives", Component: SC_LearningObjectives },
          { path: "section-1", Component: SC_Section1 },
          { path: "section-2", Component: SC_Section2 },
          { path: "section-3", Component: SC_Section3 },
          { path: "section-4", Component: SC_Section4 },
          { path: "section-5", Component: SC_Section5 },
          { path: "conclusion", Component: SC_Conclusion },
          { path: "bibliography", Component: SC_Bibliography },
        ],
      },

      // Course 03 — Blockchain Platforms
      {
        path: "blockchain-platforms",
        Component: BlockchainPlatformsRoot,
        children: [
          { index: true, Component: BlockchainPlatformsHome },
          { path: "learning-objectives", Component: BP_LearningObjectives },
          { path: "section-0", Component: Section0 },
          { path: "section-1", Component: BP_Section1 },
          { path: "section-2", Component: BP_Section2 },
          { path: "section-3", Component: BP_Section3 },
          { path: "section-4", Component: BP_Section4 },
          { path: "section-5", Component: BP_Section5 },
          { path: "conclusion", Component: Conclusion },
          { path: "bibliography", Component: BP_Bibliography },
        ],
      },

      // Course 04 — Project Management for Blockchain Initiatives
      {
        path: "project-management",
        Component: ProjectManagementRoot,
        children: [
          { index: true, Component: ProjectManagementHome },
          { path: "learning-objectives", Component: PM_LearningObjectives },
          { path: "section-1", Component: PM_Section1 },
          { path: "section-2", Component: PM_Section2 },
          { path: "section-3", Component: PM_Section3 },
          { path: "section-4", Component: PM_Section4 },
          { path: "section-5", Component: PM_Section5 },
          { path: "conclusion", Component: PM_Conclusion },
          { path: "bibliography", Component: PM_Bibliography },
        ],
      },

      // Catch-all: any unknown path redirects to the academy landing
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
