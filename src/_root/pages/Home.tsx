import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-queries/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPost } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="w-full">
            <h2 className="h3-bold md:h2-bold text-left">Home Feed</h2>
          </div>
          {isPostLoading && !posts ? <Loader /> : <ul className="flex flex-col flex-1 gap-9 w-full">{posts?.documents.map((post: Models.Document) => post.$id)}</ul>}
        </div>
      </div>
    </div>
  );
};

export default Home;
