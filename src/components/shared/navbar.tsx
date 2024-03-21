import SideBar from "./sidebar";
import CreateLinkDialog from "./createLinkDialog";
import logo from '@/assets/logo.svg'
const Navbar = () => {
  return (
    <nav className="bg-zinc-900 flex justify-between items-center">
      <div className="flex p-2 items-center  gap-2">
        <div className=" flex items-center justify-center align-middle">

        <SideBar />
        </div>
        <img src={logo} className="h-[18px] w-[18px] bg-contain"/>
        <h2 className="font-medium text-lg">url-short</h2>
      </div>
      <div className="p-4 flex items-center justify-center">
        <CreateLinkDialog />
      </div>
    </nav>
  );
};

export default Navbar;
