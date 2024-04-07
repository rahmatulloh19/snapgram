import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-queries/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id || "");

  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img className="post_details-img" src={post?.imageUrl} alt="Post image" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link className="flex items-center gap-3" to={`/profile/${post?.creator.$id}`}>
                <img className="rounded-full w-8 h-8 lg:w-12 lg:h-12" src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="Creator image" />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">{multiFormatDateString(post?.$createdAt)}</p>-<p className="subtle-semibold lg:small-regular">{post?.location}</p>
                  </div>
                </div>
              </Link>
              <div className="flex-center flex-wrap">
                <Link className={`${user.id !== post?.creator.$id ? "hidden" : ""} shrink-0`} to={`/update-post/${post?.$id}`}>
                  <img src="/assets/icons/edit.svg" width={24} height={24} alt="Pen icon" />
                </Link>

                <Button className={`ghost_details-delete_btn shrink-0 ${user.id !== post?.creator.$id ? "hidden" : ""}`} variant="ghost" onClick={handleDeletePost}>
                  <img src="/assets/icons/delete.svg" width={24} height={24} alt="Garbage icon" />
                </Button>
              </div>
            </div>

            <hr className="w-full border border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <h4>{post?.caption}</h4>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: number) => (
                  <li key={`${tag}-${index}`} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full ">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
