import { HomeIcon, ReaderIcon } from "@radix-ui/react-icons";

import {
  Home,
  Settings,
  Rocket,
  MonitorCog,
  LayoutList,
  NotepadTextDashed,
  ArrowLeftRight,
} from "lucide-react";

export const navigations = [
  {
    name: "home",
    link: "/home",
    Icon: HomeIcon,
  },
  {
    name: "Docs",
    link: "/docs",
    Icon: ReaderIcon,
  },
];

export const sidebarNavigations = [
  {
    name: "Home",
    link: "/home",
    Icon: Home,
  },
  {
    name: "Campaigns",
    link: "/campaigns",
    Icon: Rocket,
  },
  {
    name: "Contact-lists",
    link: "/contact-lists",
    Icon: LayoutList,
  },
  {
    name: "Templates",
    link: "/templates",
    Icon: NotepadTextDashed,
  },
  {
    name: "Transactional",
    link: "/transactional",
    Icon: ArrowLeftRight,
  },
  {
    name: "System config",
    link: "/system-config",
    Icon: MonitorCog,
  },
];

export const sidebarDownNavigations = [
  {
    name: "Settings",
    link: "/settings",
    Icon: Settings,
  },
];
