"use client";

import { Separator } from "./ui/separator";
import { SyntheticEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "react-query";
import axios from "axios";
import { useComments } from "@/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/types";

function Comments({ postSlug }: { postSlug: string }) {
  const { status } = useSession();
  const [content, setContent] = useState("");

  const createComment = (newComment: Partial<Comment>) => {
    return axios.post("/api/comments", newComment).then((res) => res.data);
  };

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => {
      console.log("comment as been created", data);
    },
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({ content, postSlug });
    console.log(content, postSlug);
  };

  const { data: comments, isFetching } = useComments(postSlug);
  return (
    <div className="mt-10">
      <Separator />
      <h2 className="text-2xl text-slate-500 font-semibold">Comments</h2>
      {/* formulaire */}
      <div className="mt-2 mb-6">
        {status === "authenticated" ? (
          <div className="">
            <Textarea
              placeholder="Any comment?"
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              disabled={content === "" || isLoading}
              onClick={onSubmit}
              className="mt-4"
            >
              {isLoading ? "Adding your comment" : "Add comment"}
            </Button>
          </div>
        ) : (
          <Link href="/login" className="underline">
            Login to write a comment
          </Link>
        )}
      </div>
      {/* listes des commentaires */}
      {isFetching ? (
        <p>Loading comments</p>
      ) : (
        comments.map((comment: CommentWithUser) => (
          <div className=" flex items-center  mb-4" key={comment.id}>
            <Avatar>
              <AvatarImage src={comment.user.image || "/img/avatar.png"} />
              <AvatarFallback>{comment.user.name}</AvatarFallback>
            </Avatar>
            <div className="ml-3 p-4 border rounded-lg border-slate-400">
              <div className="flex items-center gap-2">
                <span>{comment.user.name}</span>
                <span className="text-slate-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;
