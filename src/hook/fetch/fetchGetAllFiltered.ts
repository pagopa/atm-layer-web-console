import { GET_ALL_BPMN_FILTER } from "../../commons/endpoints";
import { getQueryString } from "../../utils/Commons";
import fetch from "../useFetch";

const fetchGetAllFiltered = ({ abortController, pageIndex, pageSize, headerParams }: any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);

	const data = await fetchFromServer({
		urlEndpoint: getQueryString(GET_ALL_BPMN_FILTER, pageIndex, pageSize),
		method: "GET",	
		abortController,
		headers: headerParams,
	});

	return data;
};

export default fetchGetAllFiltered;