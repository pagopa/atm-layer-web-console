import fetch from "../useFetch";

const fetchGetAllFiltered = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);

	const data = await fetchFromServer({
		urlEndpoint: url,
		method: "GET",	
		abortController,
	});

	return data;
};

export default fetchGetAllFiltered;