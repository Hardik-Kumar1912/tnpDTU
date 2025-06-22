"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function SharePage() {
  const { token } = useParams();
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [note, setNote] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expiryRaw = localStorage.getItem(`expiry_${token}`);
        const createdAt = localStorage.getItem(`createdAt_${token}`);
        if (expiryRaw && createdAt) {
          const expiryMs = parseExpiryToMs(expiryRaw);
          const expiryTime = parseInt(createdAt) + expiryMs;
          if (Date.now() > expiryTime) {
            setExpired(true);
            return;
          }
        }

        const res = await fetch(
          `https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${token}`
        );
        if (!res.ok) throw new Error("Invalid or expired share token");

        const data = await res.json();
        setStudents(data);
        setFiltered(data);

        const savedNote = localStorage.getItem(`note_${token}`);
        if (savedNote) setNote(savedNote);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  useEffect(() => {
    const filteredData = students.filter((s) =>
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
  }, [searchTerm, students]);

  const parseExpiryToMs = (expiry) => {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1));
    if (unit === "m") return value * 60 * 1000;
    if (unit === "h") return value * 60 * 60 * 1000;
    if (unit === "d") return value * 24 * 60 * 60 * 1000;
    return 0;
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "StudentData.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("DTU T&P - Shared Student Data", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Roll No", "Name", "Email"]],
      body: filtered.map((s) => [
        s.roll_no,
        `${s.first_name} ${s.last_name}`,
        s.email,
      ]),
    });
    doc.save("StudentData.pdf");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar2 />

      <main className="flex-grow px-4 py-10 bg-muted flex justify-center items-start">
        <Card className="w-full max-w-6xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Shared Student Data
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground mt-2">
              This is a secure, read-only list of selected DTU students, shared
              by the DTU Training and Placement Cell for recruitment purposes.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Loading data...
                </p>
              </div>
            ) : expired ? (
              <p className="text-red-600 text-center font-medium">
                This link has expired. Please contact the admin for a new one.
              </p>
            ) : error ? (
              <p className="text-red-600 text-center font-medium">{error}</p>
            ) : (
              <>
                {note && (
                  <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-3 text-sm">
                    <strong>Note from Admin:</strong> {note}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Search by email..."
                    className="w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button onClick={downloadExcel} variant="outline">
                      <FileDown className="w-4 h-4 mr-2" /> Export Excel
                    </Button>
                    <Button onClick={downloadPDF} variant="outline">
                      <FileDown className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Roll No</TableHead>
                        <TableHead className="min-w-[200px]">Name</TableHead>
                        <TableHead className="min-w-[250px]">Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.length > 0 ? (
                        filtered.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell>{student.roll_no}</TableCell>
                            <TableCell>
                              {student.first_name} {student.last_name}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-center text-muted-foreground"
                          >
                            No students found matching this email.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
