import fetch from "../../useFetch";

const fetchGetAllAssociatedBpmn = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "GET",
		abortController,
	});
};

export default fetchGetAllAssociatedBpmn;