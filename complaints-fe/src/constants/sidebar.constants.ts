import { faBuilding, faChartLine, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavigationItem {
  title: string;
  path: string;
  icon: IconDefinition;
  subcategories?: NavigationItem[];
}

export const SIDEBAR_NAV_ITEMS: NavigationItem[] = [
  {
    title: "Dashboard",
    path: `/dashboard`,
    icon: faChartLine,
  },
  {
    title: "Institutions",
    path: `/institutions`,
    icon: faBuilding,
  },
];
