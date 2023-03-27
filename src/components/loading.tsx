import Image from "next/image";

export default function Loading() {
  return (
    <div className=" flex justify-center items-center animate-spin delay-700">
      <Image src="/loading.png" width={70} height={70} alt="loading icon"></Image>
    </div>
  );
}
