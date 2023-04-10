import config from "@/configuration";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      alt="logo"
      width={32}
      height={32}
      src={
        config.publicAssetBucketBasePath +
        "/images/logo_black_bg_transparent_big.png"
      }
    />
  );
}
