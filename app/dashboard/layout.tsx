"use client";
import { useEffect, useRef, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import PinInput from "@/components/shared/PinInput";
import { Toaster } from "@/components/ui/sonner";
import { useHotkeys } from "react-hotkeys-hook";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState(false);
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  const correctPassword = process.env.NEXT_PUBLIC_DASHBOARD_PIN;
  const isSubmitting = useRef(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  useHotkeys(
    "0,1,2,3,4,5,6,7,8,9",
    (event) => {
      const key = event.key;
      setInputValue((prev) => {
        const next = [...prev];
        const index = next.findIndex((val) => val === "");
        if (index !== -1) {
          next[index] = key;

          if (index === 3 && !isSubmitting.current) {
            isSubmitting.current = true;

            const pin = next.join("");
            setTimeout(() => handleSubmitPin(pin), 100);
          }
        }
        return next;
      });
    },
    {
      enabled: !authed,
    },
    [inputValue, authed]
  );

  const handleSubmitPin = (pin: string) => {
    if (pin === correctPassword) {
      setAuthed(true);
    } else {
      alert("Incorrect PIN");
      setInputValue(["", "", "", ""]);
      isSubmitting.current = false;
    }
  };

  if (!authed) {
    return (
      <>
        <main className="container mx-auto flex items-center justify-center h-[80vh]">
          <Toaster richColors />
          <PinInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmitPin={handleSubmitPin}
          />
        </main>
      </>
    );
  }

  return <div>{children}</div>;
}
