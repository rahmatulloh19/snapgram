import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserAccount } from "@/lib/appwrite/api";
import { SignUpValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = () => {
  const { toast } = useToast();

  const isLoading = false;

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    console.log(values);

    console.log(newUser);

    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      });
    }

    // const session = await signInAccount()
  }

  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" width={171} height={36} alt="Snapgram's logo" />
          <h2 className="h3-bold md:h2-bold mt-5 md:mt-12">Create new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, Please enter your details</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="shad-input" type="text" placeholder="Enter your name ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="shad-input" type="text" placeholder="Enter your username ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="shad-input" type="email" placeholder="Enter your email ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="shad-input" type="password" placeholder="Enter your password ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="shad-button_primary mb-2" type="submit">
              {isLoading ? (
                <div className="flex-center gap-2">
                  {" "}
                  <Loader /> Loading ...
                </div>
              ) : (
                "Sign-up"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center">
              Already have an account ?{" "}
              <Link className="text-primary-500 text-smile-semibold ml-1" to="/sign-in">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
