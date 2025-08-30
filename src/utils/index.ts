import {client} from "../../sanity/client.ts";
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import type {Image} from "../types";

const {projectId, dataset} = client.config();
export const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({projectId, dataset}).image(source)
        : null;

export const getPostUrl = (image: Image) => {
    return urlFor(image)?.width(image.dimensions.width).height(image.dimensions.height).url()
}