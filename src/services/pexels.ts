import { createClient, Photo, Photos } from "pexels";
import { cache } from "react";

const client = createClient(process.env.PEXELS_API_KEY!);
const query = "New york skyscrappers aesthetics";

export const getImage = async (page: number) => {
    let imageRaw = (await client.photos.search({ query, per_page: 1, page })) as Photos;
    return imageRaw.photos[0];
}