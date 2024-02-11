import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { CATEGORIES } from "@/utils/categories";
import { Category } from "@/types";

export function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <Link href="/write">
            <Button variant="ghost">Write A Post</Button>
          </Link>
          <p>Categories</p>
          {CATEGORIES.map((category: Category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block p-2 py-1 text-lg"
            >
              <Button variant="ghost"> {category.name}</Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
