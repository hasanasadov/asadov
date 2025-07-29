"use client";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import PinInput from "@/components/shared/PinInput";

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  const correctPassword = process.env.NEXT_PUBLIC_DASHBOARD_PIN;

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthed(true);
    }
  }, []);

  const handleSubmitPin = (pin: string) => {
    if (pin === correctPassword) {
      setAuthed(true);
    } else {
      alert("Incorrect PIN");
      setInputValue(["", "", "", "", ""]);
    }
  };

  if (!authed) {
    return (
      <main className="min-h-screen container mx-auto flex flex-col items-center justify-center ">
        <PinInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmitPin={handleSubmitPin}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </main>
  );
}
