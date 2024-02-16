import fetch from "../../useFetch";

const fetchDownloadWorkflowResource = ({abortController, URL}: any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({ 
		urlEndpoint: URL, 
		method: "GET", 
		abortController
	});
	return data;
};

export default fetchDownloadWorkflowResource;