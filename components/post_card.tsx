import { PostWithCategory } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle } from "lucide-react";

type Props = {
  post: PostWithCategory;
};
export default function PostCard({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="flex flex-col justify-between rounded-lg border-2 h-[100%]">
        <CardHeader>
          <div className="aspect-square relative">
            <Image
              src={post.image || "/img/mac_wallpaper.jpg"} // Utilisez l'URL de l'image si elle est définie, sinon utilisez l'image par défaut
              fill
              alt={post.title}
              className="aspect-square object-cover transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="font-semibold text-lg mt-3">{post.title}</p>
        </CardHeader>

        <CardContent>
          <Badge variant="outline">{post.cat.title}</Badge>
        </CardContent>

        <CardFooter>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <MessageCircle size={20} className="text-slate-500" />
              <p className="text-slate-500">{post.nbComments}</p>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={20} className="text-slate-500" />
              <p className="text-slate-500">{post.view}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
