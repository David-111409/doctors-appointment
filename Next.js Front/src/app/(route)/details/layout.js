import Doctoruggestions from "@/app/_components/Suggestions";

function Layout({ children }) {
  return (
    <div className="p-5">
      <div className="max-w-7xl m-auto">
        <div>{children}</div>

        <div className="max-w-sm mt-10">
          <h1 className="text-lime-600  font-bold border-b-2 border-lime-500 max-w-fit">
            Suggesstions
          </h1>
          <Doctoruggestions />
        </div>
      </div>
    </div>
  );
}

export default Layout;
