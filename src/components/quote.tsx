import useSWR from "swr";
import Loading from "./loading";
import Error from "./error";
import { fetcher } from "@/services/fetcher";
import { QUOTES_URL } from "@/services/quotes";

interface Quote {
  content: string;
  author: string;
}
export default function Quote() {
  const { data, error, isLoading } = useSWR(QUOTES_URL, fetcher, {
    refreshInterval: 60 * 1000,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <div className="quote sm:text-lg md:text-xl sm:pt-3 opacity-90">
      {data.content}
      <br />-{data.author}
    </div>
  );
}
