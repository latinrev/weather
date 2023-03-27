"use client";
import Clock from "@/components/clock";
import { getImage } from "@/services/pexels";
import { getQuote } from "@/services/quotes";
import { getTemperatureInformation } from "@/services/weather";
import Head from "next/head";
import { Photo } from "pexels";
import useSWR from "swr";
interface Home {
  temperature: string;
  min: string;
  max: string;
  state: string;
  image: Photo;
}
const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
function Home({ temperature, min, max, state, image }: Home) {
  const { data, error, isLoading } = useSWR("https://api.quotable.io/random?tags=inspirational&minLength=40&maxLength=140", fetcher, {
    refreshInterval: 60 * 1000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div
      style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%), url(${image.src.large2x})` }}
      className="flex flex-col h-screen bg-cover justify-center items-center ">
      <div className={`flex justify-center items-center flex-col text-center h-full gap-3 p-5  `}>
        <div className="text-sm sm:text-xl opacity-90">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase().replace(/,/g, "")}
        </div>
        <div className="time text-[120px] sm:text-[160px] md:text-[200px] leading-[.8] ">
          <Clock />
        </div>
        <div className="temp text-6xl sm:text-[80px] md:text-[100px] ">&nbsp;{temperature}°</div>
        <div className="moreInfo flex gap-3 items-end justify-center sm:text-2xl">
          <span className="min opacity-90 ">MIN:{min}°</span>
          <span className="state text-6xl sm:text-[80px] md:text-[100px] text-[#e5c62c]">{state}</span>
          <span className="max opacity-90">MIN:{max}°</span>
        </div>
        <div className="quote  sm:text-lg md:text-xl sm:pt-3 opacity-90">
          {data.content}
          <br />-{data.author}
        </div>
      </div>
      <div className="disclaimer text-[10px] opacity-40 text-center">
        This &nbsp;
        <a href={image.url} target="_blank">
          Photo &nbsp;
        </a>
        was taken by &nbsp;
        <a href={image.photographer_url} target="_blank">
          {image.photographer} &nbsp;
        </a>
        on Pexels
        <br />
        HTW - Joel Castillo - 2023
      </div>
    </div>
  );
}
export default Home;
export async function getStaticProps() {
  const { max, min, state, temperature } = await getTemperatureInformation();
  const image = await getImage(Math.floor(Math.random() * 501));
  return {
    props: { max, min, state, temperature, image },
    revalidate: 360, //revalidate after 6 minutes
  };
}
