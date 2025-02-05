import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Link <span className="text-blue-500">Boost</span>
          </h1>
        </div>
        <div>
          {/* Link with large button style */}
          <Link
            href={"/generator"}
            className="rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-100 hover:bg-blue-600"
          >
            Generate Link
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
