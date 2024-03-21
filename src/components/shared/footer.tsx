const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row md:justify-between border-t p-4">
      <div className="flex items-center justify-center gap-2 hidden md:flex" >
        <img src="/src/assets/logo.svg" className="h-[24px] w-[24px]" alt="logo" />
        <p className="font-medium text-sm ">url-short</p>
      </div>
      <p className="font-medium text-sm m-auto md:m-0">Developed by Pranay</p>
    </footer>
  );
};

export default Footer;
