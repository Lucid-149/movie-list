import pb, { pb_url } from "@/lib/db";
import { RMovie } from "@/types/data";
import Link from "next/link";
import { ListResult } from "pocketbase";
import Image from "next/image";

export const revalidate = 0;

async function fetchData(
  id: string,
  page: number
): Promise<ListResult<RMovie>> {
  try {
    const movies = await pb.collection("movies").getList(page, 8, {
      filter: `user="${id}"`,
      sort: "-created",
    });
    return movies as unknown as ListResult<RMovie>;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const id = params.id;
  const page = parseInt(searchParams.page) || 1;
  const movies = await fetchData(id, page);

  if (!movies || movies.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center my-auto w-full gap-40">
        <h2 className="text-[32px] sm:text-5xl">Your movie list is empty</h2>
        <Link
          className="w-full bg-primary text-center py-[16px] px-[28px] font-bold text-white max-w-[300px] transition-all rounded-[10px]"
          href={"/movies/add"}
        >
          Add a new movie
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(movies.totalItems / movies.perPage);

  return (
    <main className="min-h-screen flex flex-col max-w-7xl mx-auto p-24">
      <div className="py-120">
        <div className=" flex items-center gap-6">
          <h2>My Movies</h2>
          <Link href={"/movies/add"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              className=" w-32 h-32"
              viewBox="0 0 32 32"
            >
              <g clipPath="url(#clip0_3_194)">
                <path
                  fill="#fff"
                  d="M17.333 9.333h-2.666v5.334H9.333v2.666h5.334v5.334h2.666v-5.334h5.334v-2.666h-5.334V9.333zM16 2.667C8.64 2.667 2.667 8.64 2.667 16S8.64 29.333 16 29.333 29.333 23.36 29.333 16 23.36 2.667 16 2.667zm0 24C10.12 26.667 5.333 21.88 5.333 16S10.12 5.333 16 5.333 26.667 10.12 26.667 16 21.88 26.667 16 26.667z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_3_194">
                  <path fill="#fff" d="M0 0H32V32H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {movies.items.map((m) => (
          <Link
            className="bg-card animate-jump-in relative rounded-xl shadow-lg overflow-hidden col-span-1 aspect-[9/16] sm:p-8 flex flex-col gap-16 pb-16"
            key={m.id}
            href={`/movies/edit/${m.id}`}
          >
            <Image
              width={300}
              height={400}
              src={`${pb_url}/api/files/${m.collectionName}/${m.id}/${m.poster}`}
              alt={`Poster of ${m.title} (${m.year})`}
              className="object-cover sm:rounded-xl rounded-t-xl h-full rounded-b-none"
            />
            <div className="px-12">
              <p className="text-base font-bold">{m.title}</p>
              <p className="text-sm">{m.year}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center my-120 gap-4">
        {page > 1 && (
          <Link
            href={`/movies/${id}?page=${page - 1}`}
            className="px-4 py-2 text-white rounded-md font-bold text-sm"
          >
            Prev
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <Link
            key={pg}
            href={`/movies/${id}?page=${pg}`}
            className={`p-8 aspect-square w-32 text-center text-xs font-bold flex items-center justify-center rounded-md ${
              pg === page ? "bg-green-500 text-white" : " bg-[#092C39] text-white"
            }`}
          >
            {pg}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            href={`/movies/${id}?page=${page + 1}`}
            className="px-4 py-2 text-white rounded-md text-sm font-bold"
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
