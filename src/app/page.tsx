import Image from "next/image";
import ImdbTop100 from "@/extra/json/imdb-top-100.json"
import Link from "next/link";

export default function Home() {
  return <main className=" grid sm:grid-cols-10 gap-2 place-content-center mx-auto h-screen overflow-hidden grid-cols-3 relative">
    {ImdbTop100.map((m,i)=>(
      <Image key={i} src={m.image} className=" object-cover" width={200} height={400} alt={m.title}/>
    ))}
    <div className=" bg-background/70 absolute top-0  left-0 h-full w-full backdrop-blur-sm flex flex-col justify-center items-center gap-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className=" animate-jump-in w-64 h64"
      viewBox="0 0 24 24"
    >
      <path d="M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3zM6.2 5.3l3.1 3.9M12.4 3.4l3.1 4M3 11h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    </svg>
    <h3>
      Welcome to MovieList
    </h3>
    <Link href={'/sign-in'} className=" py-16 px-32 hover:px-48 font-bold uppercase rounded-xl shadow-2xl bg-primary text-white hover:opacity-90 transition-all">
    Sign In
    </Link>
    </div>
  </main>;
}
