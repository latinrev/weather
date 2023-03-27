import { Photo } from "pexels";

interface Footer {
  url: string;
  photographer: string;
  photographer_url: string;
}
export default function Footer({ url, photographer, photographer_url }: Footer) {
  return (
    <div className="disclaimer text-[10px] opacity-40 text-center">
      This &nbsp;
      <a href={url} target="_blank">
        Photo &nbsp;
      </a>
      was taken by &nbsp;
      <a href={photographer_url} target="_blank">
        {photographer} &nbsp;
      </a>
      on Pexels
      <br />
      HTW - Joel Castillo - 2023
    </div>
  );
}
