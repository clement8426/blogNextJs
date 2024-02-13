import { PostWithCategory } from "@/types";
import PostCard from "./post_card";

type Props = {
  posts: PostWithCategory[];
};

export default function PostsList({ posts }: Props) {
  return (
    <div className="mt-6 gap-4 grid grid-cols-1 sm:grid-cols-3 md-grid-cols-4 lg-grid-cols-5">
      {posts.map((post: PostWithCategory) => (
        <PostCard key={post.id} post={post}></PostCard>
      ))}
    </div>
  );
}
