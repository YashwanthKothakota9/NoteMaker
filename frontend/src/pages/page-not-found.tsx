import { X } from 'lucide-react';

const PageNotFound = () => {
  return (
    <main className="container mt-5">
      <div className="text-red-500 font-bold flex gap-3 items-center ">
        <X size={64} />
        <h1 className="text-5xl">Page not found</h1>
      </div>
      <p className="text-[#3f2009] font-semibold pl-2">
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
};

export default PageNotFound;
