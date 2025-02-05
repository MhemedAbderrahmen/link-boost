import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default function Generator() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-screen flex-col">
        <div className="container flex flex-col gap-8 px-4 py-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl font-extrabold tracking-tight sm:text-[5rem]">
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
          <div>
            <p>
              Elit officia voluptate in id reprehenderit. Sit irure ut cupidatat
              irure cillum cillum qui est et. Nisi laborum ullamco occaecat
              laboris aute adipisicing ullamco incididunt. Cupidatat aliqua
              cillum id tempor ex est eu in ex minim. Duis nostrud incididunt
              veniam eu laborum cupidatat nisi aliquip cillum pariatur.
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
