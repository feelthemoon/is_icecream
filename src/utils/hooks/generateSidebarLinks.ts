import type { Component } from "vue";

import {
  AccountMultiple,
  Finance,
  Sitemap,
  Bell,
  FileChart,
  TruckDelivery,
} from "mdue";
import { useI18n } from "vue-i18n";

import { UserRoles } from "@/config/app/types/UserRoles";

export const useLinks = (
  userRole: string
): Array<{
  id: number;
  title: string;
  path: string;
  icon: Component;
}> => {
  const { t } = useI18n();

  const COMMON_LINKS = [
    {
      title: t("components.sidebar.links_titles.notifications_title"),
      path: "/notifications",
      icon: Bell,
    },
    {
      title: t("components.sidebar.links_titles.supplies_title"),
      path: "/supplies",
      icon: TruckDelivery,
    },
    {
      title: t("components.sidebar.links_titles.reports_title"),
      path: "/reports",
      icon: FileChart,
    },
  ];

  let roleLinks: Array<{
    title: string;
    path: string;
    icon: Component;
  }> = [];

  switch (userRole) {
    case UserRoles.ADMIN:
      roleLinks = [
        {
          title: t("components.sidebar.links_titles.employees_title"),
          path: "/employees",
          icon: AccountMultiple,
        },
        {
          title: t("components.sidebar.links_titles.statistics_title"),
          path: "/statistics",
          icon: Finance,
        },
        {
          title: t("components.sidebar.links_titles.stalls_title"),
          path: "/stalls",
          icon: Sitemap,
        },
      ];
      break;
    case UserRoles.MANAGER:
      roleLinks = [
        {
          title: t("components.sidebar.links_titles.employees_own_title"),
          path: "/employees",
          icon: AccountMultiple,
        },
        {
          title: t("components.sidebar.links_titles.statistics_own_title"),
          path: "/statistics",
          icon: Finance,
        },
      ];
      break;
    case UserRoles.SALLER:
      roleLinks = [
        {
          title: t("components.sidebar.links_titles.statistics_own_title"),
          path: "/statistics",
          icon: Finance,
        },
      ];
      break;
  }

  return [...roleLinks, ...COMMON_LINKS].map((link, index) => ({
    ...link,
    id: index + 1,
  }));
};
