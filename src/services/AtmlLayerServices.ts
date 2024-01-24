/* eslint-disable @typescript-eslint/no-floating-promises */
import fetchDeleteBpmn from "../hook/fetch/Bpmn/fetchDeleteBpmn";
import fetchGetAllFiltered from "../hook/fetch/fetchGetAllFiltered";

const abortController = new AbortController();

export const getAllBpmn = async (pageIndex: number, pageSize: number) =>
	new Promise((resolve) => {
		void fetchGetAllFiltered({ abortController, pageIndex, pageSize })()
			.then((response: any) => {
				if (response) {
					resolve({
						data: response,
						type: "SUCCESS"
					});
				} else {
					resolve({
						type: "ERROR"
					});
				}
			})
			.catch((err) => {
				console.log("ERROR", err);
			});
	});