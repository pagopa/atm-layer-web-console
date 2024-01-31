import fetch from "../useFetch";

const fetchGetAllFiltered = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch();

	const data = await fetchFromServer({
		urlEndpoint: url,
		method: "GET",	
		abortController,
	});

	return data;
};

export default fetchGetAllFiltered;