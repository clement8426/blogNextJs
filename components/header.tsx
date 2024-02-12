import React from "react";
import PageContainer from "./page-container";
import { HeaderNavigation } from "./header-navigation";
import ProfileButton from "./profile-button";
import { ResponsiveMenu } from "./responsive-menu";
import ToggleTheme from "./toggle-theme";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <PageContainer>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-cehter gap-2">
            <ResponsiveMenu />
            <h1
              className="text-2xl font-bold
          text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-bleu-600
          "
            >
              NextBlog
            </h1>
          </div>
          {/*navigation shadcn*/}
          <HeaderNavigation />
          {/*button*/}
          <div className="flex itmes-center gap-2">
            {/* toggle */}
            <ToggleTheme />
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
