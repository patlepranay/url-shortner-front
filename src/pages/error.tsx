import { AlertCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
      <AlertCircle className="w-9 h-9" />
      <h2 className="font-medium text-2xl m-2 text-center">
        Page you are looking for doesn't exists!!
      </h2>
    </div>
  );
};

export default Error;
