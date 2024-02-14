"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ProfileButton() {
  const { data: session, status } = useSession();
  console.log("session", session, status);

  if (!session) {
    return (
      <Link href="/login " className="flex items-center">
        <Button>login</Button>
      </Link>
    );
  }

  const onLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={"/img/avatar.png"}
            alt="avatar"
            className="max-w-10 max-h-10"
          />
          <AvatarFallback>{session.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer ">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
