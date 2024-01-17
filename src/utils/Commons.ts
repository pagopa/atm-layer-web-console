import { DEFAULT_PATH_IMAGES } from "./Constants";

export function getCompletePathImage(image: string) {
	const frontend_url = process.env.REACT_APP_URL_FE;
	const pathImg = frontend_url + DEFAULT_PATH_IMAGES + image;
	// console.log("path: " + pathImg);
	return pathImg;
}

export const isValidUUID = (uuid: string) => {
	const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidRegex.test(uuid);
};