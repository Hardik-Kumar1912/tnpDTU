"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { logout } from "@/lib/auth.js";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between bg-white text-foreground border-b px-8 py-2 shadow-md">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-4">
        <Image
          src="/dtu-logo.png"
          alt="DTU Logo"
          width={64}
          height={64}
          className="rounded-md object-contain"
          priority
        />
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold tracking-tight">
            DTU - TnP Cell
          </span>
          <span className="text-sm text-muted-foreground">
            Training & Placement Portal
          </span>
        </div>
      </div>

      {/* Right: Logout Icon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-9 w-9" />
            <span className="sr-only">Logout</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Logout</TooltipContent>
      </Tooltip>
    </nav>
  );
}
