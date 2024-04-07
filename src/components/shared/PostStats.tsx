import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-queries/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

  const handleLikePost = (evt: React.MouseEvent) => {
    evt.stopPropagation();

    let newLikes = [...likes];

    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);

    likePost({
      postId: post?.$id || "",
      likesArray: newLikes,
    });
  };

  const handleSavePost = (evt: React.MouseEvent) => {
    evt.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    }

    savePost({ postId: post?.$id || "", userId });

    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img className="cursor-pointer" src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} width={20} height={20} onClick={handleLikePost} alt="Like image" />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img className="cursor-pointer" src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"} width={20} height={20} onClick={handleSavePost} alt="Save image" />
        )}
      </div>
    </div>
  );
};

export default PostStats;
