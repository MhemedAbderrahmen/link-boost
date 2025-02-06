"use client";

import { api } from "@/trpc/react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Copy, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

async function clipboardCopy(value: string) {
  await navigator.clipboard.writeText(value);
}

export function ValidateClaim() {
  const [showSecretKey, setShowSecretKey] = useState(false);

  const [secretKey, setSecretKey] = useState<string | null | undefined>();
  const { mutateAsync: createLink } = api.link.create.useMutation({
    onSuccess: ({ secretKey }) => {
      setSecretKey(secretKey);
    },
  });

  const { mutateAsync } = api.link.getAvailability.useMutation({
    onSuccess: async () => {
      toast.dismiss("check-availability");
      toast.success("Link is available!", { duration: 3000 });

      await createLink({ name: form.getValues("name") });
    },
    onError: ({ data }) => console.log(data),
    onMutate: () =>
      toast.loading("Checking availability..", { id: "check-availability" }),
  });

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
    <div className="flex w-full items-center justify-center gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
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
          <div className="flex w-full flex-row items-center gap-2">
            <p>Are you sure you want to claim this link?</p>
            <AlertDialog open={secretKey ? true : false}>
              <AlertDialogTrigger asChild>
                <Button>Claim Now</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Your link is claimed!</AlertDialogTitle>
                  <AlertDialogDescription className="flex flex-col gap-2">
                    <span>
                      Please make sure to save your secret key somewhere safe.
                      You will only be able to update your page using this key
                      in the future.
                    </span>
                    <span className="flex flex-row items-center justify-center gap-2">
                      <Input
                        type={showSecretKey ? "text" : "password"}
                        disabled
                        value={secretKey ?? ""}
                      />
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setShowSecretKey((prev) => !prev)}
                      >
                        {showSecretKey ? <EyeOff /> : <Eye />}
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => clipboardCopy(secretKey ?? "")}
                      >
                        <Copy />
                      </Button>
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
