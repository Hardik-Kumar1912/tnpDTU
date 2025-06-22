"use client";

import Image from "next/image";

export default function Navbar() {

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
          <span className="text-xl font-bold tracking-tight">DTU - TnP Cell</span>
          <span className="text-sm text-muted-foreground">Training & Placement Portal</span>
        </div>
      </div>

    </nav>
  );
}
