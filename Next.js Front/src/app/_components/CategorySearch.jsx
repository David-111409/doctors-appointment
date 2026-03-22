"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function CategorySearch() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-10">
      <h2 className="font-bold text-4xl mb-7">
        <span className="text-lime-600">Search</span> Categories
      </h2>
      <div className="flex items-center w-full max-w-sm gap-1">
        <Input placeholder="Email" type={"email"} />
        <Button  type="submit">Subscribe</Button>
      </div>
    </form>
  );
}

export default CategorySearch;
