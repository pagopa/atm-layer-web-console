import { RESOURCES_CREATE } from "../../../commons/endpoints";
import fetch from "../../useFetch";

const fetchCreateResources = ({ abortController, body }: any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({
		urlEndpoint: RESOURCES_CREATE,
		method: "POST",
		abortController,
		body
	});
	return data;
};

export default fetchCreateResources;