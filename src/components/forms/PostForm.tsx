import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost } from "@/lib/react-queries/queriesAndMutations";

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const navigate = useNavigate();

  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();

  const { toast } = useToast();

  const { user } = useUserContext();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: "Post creation failed. Please try again",
        variant: "destructive",
      });
    }

    navigate("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" placeholder="Add some captions ..." {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader mediaUrl={post?.imageUrl} fieldChange={field.onChange} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" placeholder="New York, London ..." {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" placeholder="Art, Expression, Learn ..." {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end">
          <Button className="shad-button_dark_4 !h-auto" type="button">
            Cancel
          </Button>
          <Button className="shad-button_primary whitespice-nowrap" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
