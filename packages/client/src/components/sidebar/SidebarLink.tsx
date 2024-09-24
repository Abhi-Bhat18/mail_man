import React from "react";
import Link from "next/link";

interface Props {
  name: string;
  link: string;
  Icon: React.ComponentType<any>;
  currentPath: string;
}

const SidebarLink: React.FC<Props> = ({ name, link, Icon, currentPath }) => {

  return (
    <Link href={link} className={`flex space-x-5 hover:bg-secondary p-2 rounded-md ${currentPath == link ? 'bg-secondary' : ''}`}>
      <Icon />
      <p>{name}</p>
    </Link>
  );
};

export default SidebarLink;
