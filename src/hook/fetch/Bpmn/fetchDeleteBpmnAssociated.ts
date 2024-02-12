import fetch from "../../useFetch";

const fetchDeleteAssociatedBpmn = ({ abortController, url }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "DELETE",
		abortController
	});
};

export default fetchDeleteAssociatedBpmn;