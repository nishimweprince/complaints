import { useAppSelector } from '@/states/hooks';
import {
  faBuilding,
  faChartLine,
  faTicket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { PermissionNames } from './permission.constants';

interface NavigationItem {
  title: string;
  path: string;
  icon: IconDefinition;
  subcategories?: NavigationItem[];
  condition?: boolean;
}

export const useSidebarNavItems = () => {
  /**
   * STATE VARIABLES
   */
  const { permissions } = useAppSelector((state) => state.auth);

  /**
   * MEMOIZED NAVIGATION ITEMS
   */
  const sidebarNavItems: NavigationItem[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        path: `/dashboard`,
        icon: faChartLine,
        condition: true,
      },
      {
        title: 'Institutions',
        path: `/institutions`,
        icon: faBuilding,
        condition:
          permissions?.length === Object.values(PermissionNames)?.length,
      },
      {
        title: 'Tickets',
        path: `/tickets`,
        icon: faTicket,
        condition: true,
      },
    ],
    [permissions?.length]
  );

  return sidebarNavItems;
};
