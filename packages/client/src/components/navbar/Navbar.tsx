import NavLink from "./NavLink";
import { navigations } from "@/utils/config";
import { ToggleTheme } from "./ToggleTheme";

const DeskNav = () => {
  return <nav className="lg:flex items-center fixed flex top-0 w-full mx-auto py-4 px-8 backdrop-blur-lg bg-transparent justify-center border-b-[1px] border-b-secondary-foreground">

    <div className="flex justify-between items-center w-full max-w-[1400px]">
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

  </nav>
}
const Navbar = () => {
  return (
    <>
      <DeskNav />
    </>
  );
};

export default Navbar;
