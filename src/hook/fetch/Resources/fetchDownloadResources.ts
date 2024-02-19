import fetch from "./../../useFetch";

const fetchDownloadResources = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch(url);

	return await fetchFromServer({
		urlEndpoint: "",
		method: "GET",
		abortController,
	});
};

export default fetchDownloadResources;