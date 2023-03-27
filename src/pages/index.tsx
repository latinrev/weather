import { useEffect, useState } from "react";
import Clock from "@/components/clock";
import TemperatureInfo from "@/components/temperatureInfo";
import Footer from "@/components/footer";
import Quote from "@/components/quote";
import { Photo } from "pexels";
import { getImage } from "@/services/pexels";
import { Location } from "../interfaces/LocationInterface";

interface Home {
  image: Photo;
}
function Home({ image }: Home) {
  const [location, setLocation] = useState<Location>({});

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);
  return (
    <div
      style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%), url(${image.src.large2x})` }}
      className="flex flex-col h-screen bg-cover justify-center items-center text-white">
      <div className={`flex justify-center items-center flex-col text-center h-full gap-3 p-5  `}>
        <div className="text-sm sm:text-xl opacity-90">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase().replace(/,/g, "")}
        </div>
        <div className="time text-[120px] sm:text-[160px] md:text-[200px] leading-[.8] ">
          <Clock />
        </div>
        {location.latitude && location.longitude ? <TemperatureInfo latitude={location.latitude} longitude={location.longitude} /> : null}
        <Quote />
      </div>
      <Footer photographer={image.photographer} photographer_url={image.photographer_url} url={image.url} />
    </div>
  );
}
export default Home;
export async function getStaticProps() {
  const image = await getImage(Math.floor(Math.random() * 501));
  return {
    props: { image },
    revalidate: 360, //revalidate after 6 minutes
  };
}
