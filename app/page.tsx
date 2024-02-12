"use client";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/page-container";
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/categories";
import Link from "next/link";
import PostsList from "../components/posts-list";
import { POSTS } from "@/utils/posts";

export default function Home() {
  return (
    <PageContainer>
      <div className="py-10 px-4">
        {/* 1 section */}
        <div
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
          style={{
            backgroundImage: "url(/img/mac_wallpaper.jpg)",
            backgroundPosition: "center",
          }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">
                Become A Better React Developper
              </h1>
              <Input
                type="email"
                placeholder="Email"
                className="dark:bg-white mt-4"
              />
              <Button size="lg" className="w-full py-6 text-xl mt-4">
                Subscribe to our Newsletter
              </Button>
            </div>
          </div>
        </div>
        {/* 2 section CATEGOEIRES */}
        <div className=" mt-4 flex flex-col md:flex-row justify-center items-center gap-4 ">
          {CATEGORIES.map((category: Category) => (
            <Button variant="outline" key={category.id}>
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
        {/* 3 section POST */}
        <PostsList posts={POSTS} />
      </div>
    </PageContainer>
  );
}
