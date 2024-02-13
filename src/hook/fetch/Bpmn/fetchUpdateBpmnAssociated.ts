import fetch from "../../useFetch";

const fetchUpdateBpmnAssociated = ({ abortController, body, url }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "PUT",
		body,
		abortController
	});
};

export default fetchUpdateBpmnAssociated;