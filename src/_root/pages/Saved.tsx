import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-queries/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((post: Models.Document) => ({
      ...post.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img className="invert-white" src="/assets/icons/save.svg" width={56} height={56} alt="Save image" />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? <p className="text-light-4">No available posts</p> : <GridPostList posts={savePosts} showStats={false} />}
        </div>
      )}
    </div>
  );
};

export default Saved;
