"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.replace("/login");
  }
  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a post" />
        {/* title */}
        <Input
          type="text"
          placeholder="Title"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* categrories  */}
        {/* content */}
        {/* button  */}
      </div>
    </PageContainer>
  );
}
