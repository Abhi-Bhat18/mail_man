import React from "react";
import Link from "next/link";
import { IconProps } from "@tabler/icons-react";

interface Props {
  name: string;
  link: string;
  Icon: React.ForwardRefExoticComponent<IconProps>;
}
const SidebarLink: React.FC<Props> = ({ name, link, Icon }) => {
  return (
    <Link href={link} className="flex space-x-5 bg-secondary">
      <Icon/>
      <p>{name}</p>
    </Link>
  );
};

export default SidebarLink;
