import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => (
        <NavLink className={`flex-center flex-col gap-1 p-2 transition rounded-[10px] ${pathname === link.route ? "bg-primary-500" : ""} `} key={link.label} to={link.route}>
          <img className={`group-hover:invert-white ${pathname === link.route ? "invert-white" : ""}`} width={16} height={16} src={link.imgURL} alt={link.label} />
          <p className="tiny-medium text-light-2">{link.label}</p>
        </NavLink>
      ))}
    </section>
  );
};

export default BottomBar;
