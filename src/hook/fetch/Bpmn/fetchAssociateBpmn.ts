import fetch from "../../useFetch";

const fetchAssociateBpmn = ({ abortController, body, url }: any) => async () => {
	const fetchFromServer = fetch();

	return await fetchFromServer({
		urlEndpoint: url,
		method: "POST",
		body,
		abortController,
		headers: { "Content-Type" : "application/json" }
	});
};

export default fetchAssociateBpmn;