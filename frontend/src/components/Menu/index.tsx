import MenuItem from "../MenuItem";
import { House, User, UsersThree } from "phosphor-react";

function Menu() {
  return (
    <ul className="pr-2">
      <MenuItem menuTitle="Página inicial">
        <House size={48} weight="fill" />
      </MenuItem>
      
      <MenuItem menuTitle="Perfil">
        <User size={48} weight="fill" />
      </MenuItem>

      <MenuItem menuTitle="Amigos">
        <UsersThree size={48} weight="fill" />
      </MenuItem>
    </ul>
  );
}

export default Menu;
