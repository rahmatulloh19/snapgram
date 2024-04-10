import ProfileUploader from "@/components/shared/ProfileUploader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useGetUserById } from "@/lib/react-queries/queriesAndMutations";
import { ProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const UpdateProfile = () => {
  const { id } = useParams();

  const { data: currentUser } = useGetUserById(id || "");

  const handleUpdate = () => {};

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: "",
      username: "",
      email: "",
      bio: "",
    },
  });

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img className="invert-white" src="/assets/icons/edit.svg" width={36} height={36} alt="Edit image" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-7 w-full mt-4 max-w-5xl" onSubmit={form.handleSubmit(handleUpdate)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader fieldChange={field.onChange} mediaUrl={currentUser.imageUrl} />
                  </FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Enter your name" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
