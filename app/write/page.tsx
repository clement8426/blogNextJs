"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useLayoutEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";

// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import axios from "axios";
import { Post } from "@prisma/client";
import { Category } from "@/types";

import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File>();
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

  const { data: categories, isFetching } = useCategories();

  const router = useRouter();

  const createPost = (newPost: Partial<Post>): Promise<any> =>
    axios.post("/api/posts", newPost).then((res) => res.data);

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data: Post) => {
      router.push(`/posts/${data.slug}`);
    },
  });

  const { data: session } = useSession();

  useLayoutEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }
  }, [router, session]);

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files || !files[0]) return;

    setFile(files[0]);
    setImageObjectUrl(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const image = await uploadImage();
    console.log("image is", image);

    if (
      title !== "" &&
      catSlug !== "" &&
      content !== "" &&
      image !== undefined &&
      image !== null
    ) {
      console.log("Submitting post...");

      await mutate({
        title,
        catSlug,
        content,
        slug: slugify(title),
        image: image,
      });
    }
  };

  const uploadImage = async () => {
    try {
      if (!file) return;
      const data = new FormData();
      data.set("file", file);

      const response = await axios.post("/api/upload", data);
      return response.data;
    } catch (error) {
      console.log("Error in uploadImage", error);
    }
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a post" />
        {/* image */}
        <div className="mb-6">
          {imageObjectUrl && (
            <div className="relative w-40 h-40 mx-auto mb-2">
              <Image src={imageObjectUrl} fill alt={title} />
            </div>
          )}
          <Input type="file" name="image" onChange={onChangeFile} />
        </div>
        {/* title */}
        <Input
          type="text"
          placeholder="Title"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* categrories  */}
        {isFetching ? (
          <p>Loading categories :</p>
        ) : (
          <Select onValueChange={(value) => setCatSlug(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {/* content */}
        {/* <ReactQuill
          className="mt-6"
          placeholder="Write your post here"
          value={content}
          onChange={setContent}
        ></ReactQuill> */}
        <Textarea
          className="mt-6 w-full h-40 border border-gray-300 rounded-md p-2"
          placeholder="Write your post here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* button  */}
        <Button disabled={isLoading} className="mt-6" onClick={handleSubmit}>
          {isLoading ? "Creating your article" : "Publish"}
        </Button>
      </div>
    </PageContainer>
  );
}
