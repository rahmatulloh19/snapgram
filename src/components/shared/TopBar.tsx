import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-queries/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" width={130} height={325} alt="logo" />
        </Link>
        <div className="flex gap-4">
          <Button variant={"ghost"} className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout image" />
          </Button>
          <Link className="flex-center gap-3" to="/profile">
            <img className="h-8 w-8 rounded-full" src={user.imageUrl || "/assets/images/profile-placeholder.svg"} alt="Profile image" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
