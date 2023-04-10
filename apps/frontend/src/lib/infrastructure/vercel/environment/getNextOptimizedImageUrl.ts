import configuration from "@/configuration";

export default function getNextOptimizedImageUrl(
  previewImage: string,
  width: number
) {
  return `${configuration.baseUrl}/_next/image?url=${encodeURIComponent(
    previewImage
  )}&w=${width}&q=75`;
}
