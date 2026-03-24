import CategoriesSideBar from "@/app/_components/CategoriesSideBar";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 gap-10 px-6 lg:px-12 mt-10 mb-10">
     
      <div className="md:w-1/2 w-full">
        <h2 className="font-bold text-lg mb-4 text-lime-600">Search By Categories</h2>
        <CategoriesSideBar />
      </div>
      
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
