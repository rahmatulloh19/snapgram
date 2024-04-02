import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-queries/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  // isError: isErrorPost
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  // if (isErrorPosts || isErrorCreators) {
  //   return (
  //     <div className="flex flex-1">
  //       <div className="home-container">
  //         <p className="body-medium text-light-1">Something bad happened</p>
  //       </div>
  //       <div className="home-creators">
  //         <p className="body-medium text-light-1">Something bad happened</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="w-full">
            <h2 className="h3-bold md:h2-bold text-left">Home Feed</h2>
          </div>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
