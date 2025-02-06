import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ValidateClaim } from "@/components/validate-claim";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default function Generator() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex w-full flex-col items-center justify-center gap-8 px-4 py-4">
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="text-xl font-extrabold tracking-tight">
              <Link href={"/"}>
                Link <span className="text-blue-500">Boost</span>
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <Button size={"sm"}>Docs</Button>
              <ModeToggle />
            </div>
          </div>
          {/* Content */}
          <div className="flex h-full min-h-screen flex-col items-center justify-center">
            <ValidateClaim />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
