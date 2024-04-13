import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-queries/queriesAndMutations";
import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LikedPosts } from ".";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => {
  return (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id || "");
  const { user } = useUserContext();
  const { pathname } = useLocation();

  if (!currentUser || !user.name) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="Profile image"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex justify-center xl:justify-between w-full">
              <div>
                <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                  {currentUser.name}
                </h1>
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                  @{currentUser.username}
                </p>
              </div>

              <div className="hidden justify-center gap-4 xl:flex">
                <div className={`${user.id !== currentUser.$id ? "hidden" : ""}`}>
                  <Link
                    to={`/update-profile/${id}`}
                    className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                      user.id !== currentUser.$id ? "hidden" : ""
                    }`}
                  >
                    <img src="/assets/icons/edit.svg" width={20} height={20} alt="Pen icon" />
                    <p className="flex white-nowrap small-medium">Edit profile</p>
                  </Link>
                </div>
                <div className={`${user.id === id ? "hidden" : ""}`}>
                  <Button className="shad-button_primary px-8 !h-auto" type="button">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>
            <p className="small-regular md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4 xl:hidden">
            <div className={`${user.id !== currentUser.$id ? "hidden" : ""}`}>
              <Link
                to={`/update-profile/${id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id ? "hidden" : ""
                }`}
              >
                <img src="/assets/icons/edit.svg" width={20} height={20} alt="Pen icon" />
                <p className="flex white-nowrap small-medium">Edit profile</p>
              </Link>
            </div>
            <div className={`${user.id === id ? "hidden" : ""}`}>
              <Button className="shad-button_primary px-8 !h-auto" type="button">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id ? (
        <div className="flex max-w-5xl w-full">
          <Link
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` ? "!bg-dark-3" : ""
            }`}
            to={`/profile/${id}`}
          >
            <img src="/assets/icons/posts.svg" width={20} height={20} alt="Post icon" />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` ? "!bg-dark-3" : ""
            }`}
          >
            <img
              src={
                pathname === `/profile/${id}/liked-posts`
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              }
              width={20}
              height={20}
              alt="Like icon"
            />
            Liked Posts
          </Link>
        </div>
      ) : (
        ""
      )}

      <Routes>
        <Route index element={<GridPostList posts={currentUser.posts} showUser={false} />} />
        {currentUser.$id === user.id ? <Route path="liked-posts" element={<LikedPosts />} /> : ""}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
