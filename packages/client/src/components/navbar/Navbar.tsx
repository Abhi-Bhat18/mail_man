import { navigations } from "@/utils/config";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between border-fontColor border-b-[1px] py-5 bg-primary">
      <div className="">Logo</div>
      <div>
        <ul className="flex ">
          {navigations.map((nav) => (
            <NavLink
              Icon={nav.Icon}
              link={nav.link}
              name={nav.name}
              key={nav.link}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
