import fetch from "../useFetch";

const fetchGetTokenEmail = ({ abortController, url, jwt }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "GET",
		abortController,
		headers: {"Authorization": `Bearer ${jwt}`}
	});
};

export default fetchGetTokenEmail;