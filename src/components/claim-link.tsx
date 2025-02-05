"use client";

import { api } from "@/trpc/react";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function ClaimLink() {
  const router = useRouter();
  const { data, mutateAsync } = api.link.getAvailability.useMutation({
    onSuccess: () => {
      toast.dismiss("check-availability");
      toast.success("Link is available!", { duration: 3000 });
      router.push("/generator");
    },
    onError: ({ data }) => console.log(data),
    onMutate: () =>
      toast.loading("Checking availability...", { id: "check-availability" }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="linkboost/" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Claim Link</Button>
        </form>
      </Form>
    </div>
  );
}
