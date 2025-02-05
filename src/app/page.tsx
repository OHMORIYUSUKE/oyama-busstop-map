import { Suspense } from "react";
import { loadStops, loadHospitals } from "@/lib/loader";
import ClientPage from "@/components/ClientPage";

export default async function Home() {
  const [stops, hospitals] = await Promise.all([loadStops(), loadHospitals()]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPage initialHospitals={hospitals} stops={stops} />
    </Suspense>
  );
}
