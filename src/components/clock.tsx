import { useEffect, useState } from "react";
export default function Clock() {
  const [time, setTime] = useState(new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: false }));

  function refreshTime() {
    setTime(new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: false }));
  }
  useEffect(() => {
    let timeNow = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(timeNow);
    };
  }, []);

  return <>{time}</>;
}
