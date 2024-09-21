import { HomeIcon, ReaderIcon } from "@radix-ui/react-icons";
import { IconBrandCampaignmonitor, IconHome ,IconTemplate, IconCapProjecting} from '@tabler/icons-react';

export const navigations = [
  {
    name: "Home",
    link: "/",
    Icon: HomeIcon,
  },
  { 
    name : "Docs", 
    link : "/docs",
    Icon : ReaderIcon
  },
];

export const sidebarNavigations = [ 
  { 
    name : "Home",
    link : '/',
    Icon : IconHome,
  },
  { 
    name : "Projects",
    link : '/projects',
    Icon : IconCapProjecting
  },
  { 
    name : 'Campaigns',
    link : '/campaigns',
    Icon : IconBrandCampaignmonitor
  },
  { 
    name : 'Templates',
    link : "/templates",
    Icon : IconTemplate
  }
]
