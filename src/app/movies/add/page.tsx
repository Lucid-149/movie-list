import AddMovie from "@/components/forms/AddMovie";

export default function Page() {
  return (
    <main className=" max-w-6xl mx-auto w-full h-full  px-24  flex-grow py-80 sm:pt-10">
      <h2 className=" sm:text-5xl text-[32px] mb-80 sm:mb-120">Create a new movie</h2>
      <AddMovie />
    </main>
  );
}
