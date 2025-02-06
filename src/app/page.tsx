import { ClaimLink } from "@/components/claim-link";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex w-full max-w-lg flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Link <span className="text-blue-500">Boost</span>
          </h1>
          <div className="text-justify text-lg">
            Link Boost is a simple tool to create custom profile pages.
            <br />
            Type in the link you want to claim and claim it now!
          </div>
          <ClaimLink />
        </div>
      </main>
    </HydrateClient>
  );
}
