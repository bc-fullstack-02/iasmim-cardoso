import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logo_menu from "../../assets/logo_menu.svg";
import Text from "../../components/Text";
import Menu from "../../components/Menu";
import CreatePostButton from "../../components/CreatePostButton";
import CreatePostDialog from "../../components/CreatePostDialog";
import Feed from "../../components/Feed";

function Home() {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }
  return (
    <div className="w-screen h-screen flex">
      <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4">
        <div className="flex items-center ml-4">
          <img src={logo_menu} alt="Logo" />
          <Text className="font-extrabold ml-4">Parrot</Text>
        </div>
        <Menu />
        <div className="flex flex-col items-center">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <CreatePostButton />

            <CreatePostDialog closeDialog={closeDialog} />
          </Dialog.Root>
        </div>
      </div>
      <div className="basis-5/6 overflow-y-auto scroll-smooth">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
