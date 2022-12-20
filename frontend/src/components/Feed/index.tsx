import { UserCircle} from "phosphor-react";
import Heading from "../Heading";
import Text from "../Text";
import { Post } from "../../Model/post";
import PostItem from "../PostItem";

interface FeedProps {
  post: Post[];
  handleLike: (postId: String) => void;
}
function Feed({ posts, handleLike}: FeedProps) {
  const user = localStorage.getItem("user");
 
  return (
    <div className="basis-5/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Página inicial
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          <UserCircle size={48} weight="light" className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <section>
        {posts &&
          posts.map((post: Post) => (
            <PostItem post={post} handleLike = {handleLike} />
          ))}
      </section>
    </div>
  );
}

export default Feed;
