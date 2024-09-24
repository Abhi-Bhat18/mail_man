'use client'
import { sidebarNavigations } from "@/utils/config";
import React from "react";
import SidebarLink from "./SidebarLink";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="border-r-[1px] border-r-secondary h-screen shadow-sm w-64 flex flex-col py-5">
            <p className="font-bold text-xl px-7">Mail man</p>
            <ul className="space-y-2 my-10 px-5">
                {sidebarNavigations.map((nav) => (
                    <SidebarLink
                        currentPath={pathName}
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
