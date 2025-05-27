'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Delivery App</h1>
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
        >
          Sair
        </Button>
      </div>
    </header>
  );
}