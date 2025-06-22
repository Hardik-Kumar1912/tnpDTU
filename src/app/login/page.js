"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
  setMounted(true); // let middleware handle protection
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = toast.loading("Logging in...");

    const res = await login(username, password);

    toast.dismiss(id);

    if (res.success) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
  <Card className="w-full sm:w-[400px] md:w-[480px] px-6 py-6 shadow-xl rounded-xl animate-fadeIn">
    <CardHeader className="flex flex-col items-center gap-2">
      <Image
        src="/dtu-logo.png"
        alt="DTU Logo"
        width={80}
        height={80}
        className="rounded-full"
      />
      <CardTitle className="text-2xl sm:text-3xl font-bold text-center mt-2">
        Admin Login
      </CardTitle>
      <CardDescription className="text-center text-sm text-muted-foreground">
        Use your admin credentials to continue
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="space-y-1">
          <Label htmlFor="username" className="text-sm">Username</Label>
          <Input
            id="username"
            placeholder="Enter username"
            className="h-10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            className="h-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-base bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Login
        </Button>
      </form>
    </CardContent>

    <CardFooter className="justify-center text-xs text-muted-foreground">
      © 2025 DTU TnP Team
    </CardFooter>
  </Card>
</div>

  );
}
