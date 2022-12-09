import { useState, useEffect } from "react";
import api from "../../service/api";
import { UserCircle, Chat, Heart } from "phosphor-react";
import Heading from "../Heading";
import Text from "../Text";

interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
  comments: [];
  likes: [];
}

function Feed() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState <Post | []>([]);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get("/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);
    }
    getPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Página inicial
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          <UserCircle size={48} weight="light" className="text-slate-50" />
          <Text className="font-extrabold ml-2">Fulano da silva</Text>
        </div>
      </Heading>
      <section>
        {posts.map((post) => (
          <div className="border-b border-slate-400" key={post._id}>
            <div className="flex flex-row items-center ml-5 my-4">
              <UserCircle size={48} weight="light" className="text-slate-50" />
              <Text className="font-extrabold ml-2">{post.profile.name}</Text>
            </div>
            <div className="ml-16 flex flex-col gap-2">
              <Heading size="sm">{post.title}</Heading>
              <Text asChild >
                <p>{post.description}</p>
              </Text>
            </div>
            <div className="flex items-center ml-16 my-4 space-x-2">
              <Chat size={24} className="text-slate-50" />
              <Text size="sm">{post.comments.length}</Text>

              <div className="hover:bg-sky-400 rounded-full p-1">
                <Heart size={24} className="text-slate-50" />
              </div>

              <Text size="sm">{post.likes.length}</Text>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Feed;
