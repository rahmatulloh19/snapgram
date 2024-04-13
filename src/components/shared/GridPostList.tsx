import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li className="relative min-w-80 h-80" key={post.$id}>
          <Link className="grid-post_link" to={`/post/${post.$id}`}>
            <img className="h-full w-full object-cover" src={post.imageUrl} alt="Post" />
          </Link>
          <div className="grid-post_user">
            {showUser ? (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  className="w-8 h-8 rounded-full"
                  src={post.creator.imageUrl}
                  alt="Creator image"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            ) : (
              ""
            )}
            {showStats ? <PostStats post={post} userId={user.id} /> : ""}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
