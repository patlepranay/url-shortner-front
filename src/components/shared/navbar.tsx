import SideBar from "./sidebar";
import CreateLinkDialog from "./createLinkDialog";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 flex justify-between items-center">
      <div className="flex p-2 items-center ">
        <SideBar />
        <img src="/public/vite.svg" />
        ShortURL
      </div>
      <div>
        <CreateLinkDialog />
      </div>
    </nav>
  );
};

export default Navbar;
