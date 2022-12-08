import { UserCircle, Chat, Heart } from "phosphor-react";
import Heading from "../Heading";
import Text from "../Text";

function Feed() {
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
        <div className="border-b border-slate-400">
          <div className="flex flex-row items-center ml-5 my-4">
            <UserCircle size={48} weight="light" className="text-slate-50" />
            <Text className="font-extrabold ml-2">Fulano de tal</Text>
          </div>
          <Text asChild className="ml-16">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              fugit cum unde culpa. Pariatur rerum iste odio tenetur tempore,
              libero laudantium, dolor perferendis eveniet perspiciatis vel,
              dolorem nobis atque blanditiis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error fugit cum unde culpa. Pariatur
              rerum iste odio tenetur tempore, libero laudantium, dolor
              perferendis eveniet perspiciatis vel, dolorem nobis atque
              blanditiis.
            </p>
          </Text>
          <div className="flex items-center ml-16 my-4 space-x-2">
            <Chat size={24} className="text-slate-50" />
            <Text size="sm">9.999 </Text>

            <div className="hover:bg-sky-400 rounded-full p-1">
              <Heart size={24} className="text-slate-50" />
            </div>

            <Text size="sm">9.999 </Text>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feed;
