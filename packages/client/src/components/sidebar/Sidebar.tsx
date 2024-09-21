import { sidebarNavigations } from "@/utils/config";
import React from "react";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className="fixed top-0 bottom-0 border w-64 p-4 flex flex-col bg-card">
      <p className="font-bold text-xl mx-5">Mail man</p>
      <ul className="space-y-5 my-10 mx-5">
        {sidebarNavigations.map((nav) => (
          <SidebarLink
            name={nav.name}
            link={nav.link}
            Icon={nav.Icon}
            key={nav.link}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
