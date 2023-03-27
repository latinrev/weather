import Image from "next/image";
import Error from "@/components/error";
import Loading from "@/components/loading";
import useSWR from "swr";
import { buildTemperatureInfo, buildURL } from "@/services/weather";
import { Location } from "../interfaces/LocationInterface";

export default function TemperatureInfo({ latitude, longitude }: Location) {
  const { data, error, isLoading } = useSWR(buildURL({ latitude, longitude }), async (url: string) => {
    let data = await fetch(url).then((r) => r.json());
    return buildTemperatureInfo(data);
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="temp text-6xl sm:text-[80px] md:text-[100px] ">&nbsp;{data.temperature}°</div>
      <div className="moreInfo flex gap-3 items-end justify-center sm:text-2xl">
        <span className="min opacity-90 ">MIN:{data.min}°</span>
        <span className="state text-4xl sm:text-[80px] md:text-[100px] text-[#e5c62c]">{data.state}</span>
        <span className="max opacity-90">MIN:{data.max}°</span>
      </div>
    </>
  );
}
