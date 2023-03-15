import Image from "next/image";
import { Inter } from "next/font/google";
import { getTemperature } from "@/components/hooks/useStore";
export default async function Home() {
  const { max, min, state, temperature } = await getTemperature();
  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center text-center ">
      <div className="text-9xl">{temperature}°</div>
      <div className="text-7xl">{state}</div>
      <div className="flex gap-5">
        <div className="">Min:{min}°</div>
        <div className="">Max: {max}°</div>
      </div>
    </main>
  );
}
