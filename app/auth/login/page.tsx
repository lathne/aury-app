"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/lib/features/authSlice";
import { saveAuthData } from "@/lib/db";
import type { AuthUser } from "@/lib/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate authentication
      const userData: AuthUser = {
        id: "1",
        email,
        name: "Entregador",
        token: "mock-token",
      };

      // Save auth data for offline access with timestamp
      await saveAuthData({
        ...userData,
        timestamp: Date.now(),
      });

      dispatch(loginSuccess(userData));
      router.push("/dashboard");
    } catch (err) {
      setError("Falha no login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
