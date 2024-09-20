import { Button } from "../ui/button";
import NavLink from "./NavLink";
import { navigations } from "@/utils/config";

const DeskNav = () => {
  return <div className="hidden lg:flex items-center justify-between max-w-[1400px] mx-auto py-4">

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
    <div className="space-x-5">
      <Button>
        Demo
      </Button>
      <Button>
        Sign up
      </Button>
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
