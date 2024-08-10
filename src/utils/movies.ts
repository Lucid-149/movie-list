import pb from "@/lib/db";
import { RMovie } from "@/types/data";
import { ListResult } from "pocketbase";

export async function fetchMovies(id: string, page: number): Promise<ListResult<RMovie>> {
    try {
      const movies = await pb.collection("movies").getList(page, 8, {
        sort: '-created',
      });
      return movies as ListResult<RMovie>;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }