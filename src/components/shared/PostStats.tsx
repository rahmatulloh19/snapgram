import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return <div>PostStats</div>;
};

export default PostStats;
