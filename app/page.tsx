"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Aury App
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Bem-vindo ao aplicativo para entregadores
        </p>
        <div className="space-y-6">
          <Button 
            className="w-full h-12 text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <Button
            className="w-full h-12 text-lg font-medium rounded-lg border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => router.push("/auth/register")}
          >
            Cadastrar
          </Button>
        </div>
      </Card>
    </main>
  );
}
