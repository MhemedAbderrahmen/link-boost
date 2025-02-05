import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default function Generator() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col gap-8 px-4 py-4 justify-center items-center w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-xl font-extrabold tracking-tight">
              <Link href={"/"}>
                Link <span className="text-blue-500">Boost</span>
              </Link>
            </h1>
            <div>
              <Button size={"sm"} variant={"ghost"}>
                Docs
              </Button>
            </div>
          </div>
          {/* Content */}
          <div>
            
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
