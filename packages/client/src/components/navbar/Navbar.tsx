import { Button } from "../ui/button";
import NavLink from "./NavLink";
import { navigations } from "@/utils/config";
import { ToggleTheme } from "./ToggleTheme";

const DeskNav = () => {
  return <div className=" lg:flex items-center fixed flex top-0 w-full justify-between max-w-[1400px] mx-auto py-4 px-8 backdrop-blur-lg bg-transparent">

    <div className="flex space-x-20 items-center">
      <p className="font-bold">
        Mailman
      </p>
      <ul className="flex items-center">
      {navigations.map(nav => (
        <NavLink name={nav.name} link={nav.link} Icon={nav.Icon} key={nav.link} />
      ))}
      </ul>
    </div>
    <div className="space-x-5 flex items-center">
      <ToggleTheme />
      <button>
        Demo
      </button>
      <button>
        Sign up
      </button>
    </div>

  </div>
}
const Navbar = () => {
  return (
    <nav className="border-b-[1px] border shadow-border">
      <DeskNav />
    </nav>
  );
};

export default Navbar;
