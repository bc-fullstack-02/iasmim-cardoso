import { useState, useEffect } from "react";
import { UserCircle } from "phosphor-react";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";
import api from "../../service/api";
import { getAuthHeader } from "../../service/auth";

interface Profile {
  followButtonDisabled: boolean;
  _id: string;
  name: string;
  followes: string [];
  avatar: string;
}

function Profiles() {
  const authHeader = getAuthHeader();
  const user = localStorage.getItem("user");
  const profileId = localStorage.getItem("profile")as string;

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await api.get("/profiles", authHeader);
        setProfiles(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProfiles();
  }, []);

  async function handleFollow(profileId: string) {
    try {
      await api.post(`/profiles/${profileId}/follow`, null, authHeader);
      changeButtonStatus(profileId, true);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUnfollow(profileId: string) {
    try {
      await api.post(`/profiles/${profileId}/unfollow`,null, authHeader);
      changeButtonStatus(profileId, false);
    } catch (err) {
      console.log(err);
    };
  }
  function changeButtonStatus(profileId: string, buttonDisable: boolean) {
    setProfiles((profiles) => {
      const newProfiles = profiles.map((profile) =>{
        if (profile._id === profileId) {
          profile.followButtonDisabled = buttonDisable;
        }
        return profile;
      });
      return [...newProfiles];
    });
    }


  return (
    <div className="basis-5/6">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Amigos
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          <UserCircle size={48} weight="light" className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <ul>
        {profiles.map((profile) => (
          <li className="border-b border-slate-400 mt-4 pl-5">
            <div className="flex flex-row items-center">
              <UserCircle size={48} weight="light" className="text-slate-50" />
              <Text className="font-extrabold ml-2">{profile.name}</Text>
            </div>
            <footer className="mt-6 flex justify-start gap-4 mb-4 ">
              <Button
                type="submit"
                className="flex-none w-48"
                onClick={() => handleFollow(profile._id)}
              >
                Seguir
              </Button>
              <button
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 focus:ring-2 ring-white"
                onClick={() => handleUnfollow(profile._id)}
                disabled = {!profile.followButtonDisabled}
              >
                Parar de seguir
              </button>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;
