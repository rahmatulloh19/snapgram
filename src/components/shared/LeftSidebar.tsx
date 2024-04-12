import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-queries/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sideBarLinks } from "@/constants";
import { INavLink } from "@/types";
import Loader from "./Loader";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const { user, isLoading } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" width={170} height={36} alt="logo" />
        </Link>
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link className="flex gap-3 items-center" to={`/profile/${user.id}`}>
            <img
              className="h-14 w-14 rounded-full"
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="Profile image"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}
        <ul className="flex flex-col gap-6">
          {sideBarLinks.map((link: INavLink) => (
            <li
              className={`leftsidebar-link group ${
                pathname === link.route ? "bg-primary-500" : ""
              }`}
              key={link.label}
            >
              <NavLink className="flex gap-4 items-center p-4" to={link.route}>
                <img
                  className={`group-hover:invert-white ${
                    pathname === link.route ? "invert-white" : ""
                  }`}
                  src={link.imgURL}
                  alt={link.label}
                />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button variant={"ghost"} className="shad-button_ghost" onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout image" />
        <p className="small-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
