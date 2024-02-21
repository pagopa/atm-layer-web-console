import fetch from "../useFetch";

const fetchGetAllFiltered = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "GET",
		abortController
	});
};

export default fetchGetAllFiltered;