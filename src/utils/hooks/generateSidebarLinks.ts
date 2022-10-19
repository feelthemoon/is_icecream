import type { Component } from "vue";

import {
  AccountMultiple,
  Finance,
  Sitemap,
  Bell,
  FileChart,
  TruckDelivery,
} from "mdue";

import { UserRoles } from "@/config/app/types";

export type SidebarLinks = {
  id: number;
  title: string;
  path: string;
  icon: Component;
};

export const useLinks = ({
  userRole = UserRoles.SALLER,
  translator,
}: {
  userRole?: string;
  translator?: any;
}): Array<SidebarLinks> => {
  const COMMON_LINKS = [
    {
      id: 1,
      title: translator("components.sidebar.links_titles.notifications_title"),
      path: "/notifications",
      icon: Bell,
    },
    {
      id: 2,
      title: translator("components.sidebar.links_titles.supplies_title"),
      path: "/supplies",
      icon: TruckDelivery,
    },
    {
      id: 3,
      title: translator("components.sidebar.links_titles.reports_title"),
      path: "/reports",
      icon: FileChart,
    },
  ];

  let roleLinks: Array<SidebarLinks> = [];

  switch (userRole) {
    case UserRoles.ADMIN:
      roleLinks = [
        {
          id: 4,
          title: translator("components.sidebar.links_titles.employees_title"),
          path: "/employees",
          icon: AccountMultiple,
        },
        {
          id: 5,
          title: translator("components.sidebar.links_titles.statistics_title"),
          path: "/statistics",
          icon: Finance,
        },
        {
          id: 6,
          title: translator("components.sidebar.links_titles.stalls_title"),
          path: "/stalls",
          icon: Sitemap,
        },
      ];
      break;
    case UserRoles.MANAGER:
      roleLinks = [
        {
          id: 7,
          title: translator("components.sidebar.links_titles.employees_title"),
          path: "/employees",
          icon: AccountMultiple,
        },
        {
          id: 8,
          title: translator("components.sidebar.links_titles.statistics_title"),
          path: "/statistics",
          icon: Finance,
        },
      ];
      break;
    case UserRoles.SALLER:
      roleLinks = [
        {
          id: 9,
          title: translator("components.sidebar.links_titles.statistics_title"),
          path: "/statistics",
          icon: Finance,
        },
      ];
      break;
  }

  return [...roleLinks, ...COMMON_LINKS];
};
