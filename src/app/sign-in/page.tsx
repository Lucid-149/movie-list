import { Suspense } from "react";
import SignInForm from "@/components/forms/SignIn";

export default function Page() {
  return (
    <main className="flex h-full flex-grow items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
