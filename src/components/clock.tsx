import { useEffect, useState } from "react";
export default function Clock() {
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [time, setTime] = useState("");

  function refreshTime() {
    setTime(new Date().toLocaleString("en-US", { timeZone, hour: "numeric", minute: "numeric", hour12: false }));
  }
  useEffect(() => {
    let timeNow = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(timeNow);
    };
  }, []);

  return <>{time}</>;
}
