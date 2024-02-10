import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="secondary">
        <Eye size={24} />
        Click me
      </Button>
    </main>
  );
}
