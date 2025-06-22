"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { generateShareToken } from "@/lib/api";
import { toast } from "sonner";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [shareToken, setShareToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleGenerateShareLink = async () => {
    setLoading(true);
    const result = await generateShareToken();
    setLoading(false);

    if (result.success) {
      setShareToken(result.shareToken);
      toast.success("Link generated successfully!");
    } else {
      alert(result.message);
    }
  };

  const fullLink = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/share/${shareToken}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-10 bg-muted">
        <div className="w-full max-w-3xl space-y-10">
          {/* Welcome Section */}
          <Card className="w-full min-h-[180px] bg-card shadow-xl border rounded-2xl p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome, Admin 👋</CardTitle>
              <CardDescription className="text-muted-foreground mt-2 text-base">
                You&apos;re in the <strong>DTU T&amp;P Data Share Panel</strong>
                . Use the section below to generate secure, shareable links for
                external recruiters to view selected student data.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Link Generation Section */}
          <Card className="w-full min-h-[240px] shadow-xl border rounded-2xl p-6">
            <CardHeader>
              <CardTitle className="text-xl">
                🔗 Generate Shareable Link
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1 text-base">
                This link allows external recruiters to view selected student
                data in a read-only table. They do not need to log in.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleGenerateShareLink}
                  disabled={loading || !!shareToken}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {loading
                    ? "Generating..."
                    : shareToken
                    ? "Link Generated"
                    : "Generate Share Link"}
                </Button>

                {shareToken && (
                  <span className="text-green-600 text-sm font-medium">
                    ✔️ Link generated successfully
                  </span>
                )}
              </div>

              {shareToken && (
                <div className="bg-muted px-4 py-3 rounded border border-border space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm break-all">
                      🔗 <strong>Shareable Link:</strong>{" "}
                      <a
                        href={fullLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {fullLink}
                      </a>
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-1" /> Share
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(fullLink);
                            toast("Copied to clipboard");
                          }}
                        >
                          <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            const url = encodeURIComponent(fullLink);
                            const text = encodeURIComponent(
                              "Check out this DTU T&P data:"
                            );
                            window.open(
                              `https://wa.me/?text=${text}%20${url}`,
                              "_blank"
                            );
                          }}
                        >
                          <Image
                            src="/whatsapp.png"
                            alt="WhatsApp"
                            width={18}
                            height={18}
                            className="mr-2"
                          />
                          Share via WhatsApp
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            const subject = encodeURIComponent(
                              "DTU T&P Student Data"
                            );
                            const body = encodeURIComponent(
                              `Hi,\n\nYou can access the data here: ${fullLink}`
                            );
                            window.open(
                              `mailto:?subject=${subject}&body=${body}`
                            );
                          }}
                        >
                          <Image
                            src="/gmail.png"
                            alt="Mail"
                            width={18}
                            height={18}
                            className="mr-2"
                          />
                          Share via Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
