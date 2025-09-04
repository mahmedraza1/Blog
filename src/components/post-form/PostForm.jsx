import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import PostService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // Reset form when post changes (important for edit mode)
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        status: post.status,
      });
      
      // Log that we're resetting form with post data
      console.log("Resetting form with post data:", post);
    }
  }, [post, reset]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      
      console.log("Form data being submitted:", data);
      
      if (post) {
        // Edit mode
        let featuredImageId = post.featuredImage;
        
        // Upload new image if provided
        if (data.image && data.image.length > 0) {
          console.log("Uploading new image for post...");
          const file = await PostService.uploadFile(data.image[0]);
          if (file) {
            console.log("New image uploaded successfully:", file.$id);
            // Delete old image if new one was uploaded successfully
            await PostService.deleteFile(post.featuredImage);
            featuredImageId = file.$id;
          }
        } else {
          console.log("No new image provided, keeping existing image:", featuredImageId);
        }

        console.log("Updating post with data:", {
          title: data.title,
          content: data.content,
          slug: data.slug,
          status: data.status,
          featuredImage: featuredImageId
        });
        
        const dbPost = await PostService.updatePost({
          title: data.title,
          content: data.content,
          slug: data.slug,
          status: data.status,
          featuredImage: featuredImageId,
        }, post.$id);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Create mode
        console.log("Creating new post...");
        const file = await PostService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          console.log("Image uploaded successfully:", fileId);
          
          const postData = {
            title: data.title,
            content: data.content,
            featuredImage: fileId,
            status: data.status,
            userID: userData.$id,
            slug: data.slug
          };
          
          console.log("Creating post with data:", postData);
          const dbPost = await PostService.createPost(postData);

          if (dbPost) {
            console.log("Post created successfully:", dbPost.$id);
            navigate(`/post/${dbPost.$id}`);
          } else {
            setError("Failed to create post. Please try again.");
          }
        } else {
          setError("Failed to upload image. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      let errorMessage = "Failed to save post. Please try again.";
      
      if (error.message) {
        errorMessage += ` Error: ${error.message}`;
      }
      
      if (error.response) {
        console.error("Server response:", error.response);
        if (error.response.message) {
          errorMessage += ` (${error.response.message})`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-800 p-4 rounded-lg shadow-lg">
      {error && (
        <div className="w-full mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <p className="text-gray-400 text-sm mb-1">Current image:</p>
            <img
              src={PostService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full object-cover border border-gray-700"
            />
            <p className="text-gray-400 text-xs mt-1">Upload a new image to replace this one</p>
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-orange-500" : undefined}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            (post ? "Updating..." : "Submitting...") : 
            (post ? "Update" : "Submit")
          }
        </Button>
      </div>
    </form>
  );
};
export default PostForm;
