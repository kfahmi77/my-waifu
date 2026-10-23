import FloatingHearts from "@/components/FloatingHearts";
import ApologyJourney from "@/components/ApologyJourney";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center px-4 py-10">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-xl">
        <ApologyJourney />
      </div>
    </main>
  );
}
