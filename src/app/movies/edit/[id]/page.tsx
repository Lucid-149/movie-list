import EditMovie from "@/components/forms/EditMovie";
import SignOutButton from "@/components/SignOutButton";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <main className=" max-w-6xl mx-auto w-full h-full  px-24  flex-grow py-80 sm:pt-10">
      <div className=" w-full items-center justify-between flex">
        <h2 className=" sm:text-5xl text-[32px] mb-80 sm:mb-120">Edit</h2>
        <SignOutButton />
      </div>
      <EditMovie id={id} />
    </main>
  );
}
