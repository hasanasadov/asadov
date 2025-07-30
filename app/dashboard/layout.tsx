"use client";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import PinInput from "@/components/shared/PinInput";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
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
      setInputValue(["", "", "", ""]);
    }
  };

  if (!authed) {
    return (
      <>
        <main className="container mx-auto  ">
          <Toaster richColors />
          <PinInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmitPin={handleSubmitPin}
          />
        </main>
        <div />
      </>
    );
  }

  return <div>{children}</div>;
}
