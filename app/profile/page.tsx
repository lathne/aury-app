"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/authSlice";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto p-4">
        <Card className="max-w-md mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">Perfil do Entregador</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <p className="text-gray-600 dark:text-gray-300">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
