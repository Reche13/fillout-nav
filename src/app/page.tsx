import { Page } from "@/components/page";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <main className="w-full h-screen bg-space py-16 px-10 flex flex-col items-center">
      <Page />
      <Navigation />
    </main>
  );
}
