import { useEffect, useState } from "react";
export default function Clock() {
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [time, setTime] = useState(
    `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`
  );

  function refreshTime() {
    setTime(`${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`);
  }
  useEffect(() => {
    let timeNow = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(timeNow);
    };
  }, []);

  return <>{time}</>;
}
