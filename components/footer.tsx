import PageContainer from "./page-container";
import { CATEGORIES } from "@/utils/categories";
import { Category } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="p-4 boder-t">
      <PageContainer>
        <div className="flex flex-col md:flex-row imtes-start md:items-center justify-between">
          <h1
            className="text-2xl font-bold
          text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-bleu-600
          "
          >
            NextBlog
          </h1>
          <div className="hidden sm:flex flex-col md:flex-row gap-2">
            {CATEGORIES.map((category: Category) => (
              <div key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <Button variant="ghost"> {category.name}</Button>
                </Link>
              </div>
            ))}
            <Button variant="ghost">
              <Link href="/write">Write A Post</Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
