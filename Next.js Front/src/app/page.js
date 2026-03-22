import CategorySearch from "./_components/CategorySearch";
import DoctorsList from "./_components/DoctorsList";
import Hero from "./_components/Hero";

function page() {
  return (
    <div>
      <Hero />
      <CategorySearch />
      <DoctorsList />
    </div>
  );
}

export default page;
