import React, { SetStateAction, useContext, useState } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE, BPMN_DEPLOY_API, BPMN_DOWNLOAD_API, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import { DELETE_ASSOCIATION, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN } from "../../../commons/constants";
import { getQueryString, getTextModal, handleSnackbar } from "../../Commons/Commons";
import ModalTemplate from "../template/ModalTemplate";
import { downloadFile } from "../../../commons/decode";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";


type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	setMessage: React.Dispatch<SetStateAction<string>>;
	setTitle: React.Dispatch<SetStateAction<string>>;
};


const ModalBpmn = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {

	const { abortController, debugOn } = useContext(Ctx);
	const recordParams = JSON.parse(sessionStorage.getItem("recordParams") ?? "");
	
	const content=getTextModal(type);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);

		switch (type) {
		case DELETE_BPMN: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
		        setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DEPLOY_BPMN: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DEPLOY_API, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
			    setLoading(false);
				if (response?.success) {
					const deployedResponse = {
						...response.valuesObj,
						fileName: response.valuesObj?.resourceFile?.fileName
					};
					sessionStorage.setItem("recordParams", JSON.stringify(deployedResponse));
					setTimeout(() => {
						setOpenSnackBar(false);
						window.location.reload();
					}, 3000);
				}
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DELETE_ASSOCIATION: {
			const recordParamsAssociated = JSON.parse(sessionStorage.getItem("recordParamsAssociated") ?? "");
			const baseUrl = generatePath(DELETE_ASSOCIATE_BPMN, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
			const URL = `${baseUrl}?acquirerId=${recordParamsAssociated.acquirerId}`;
			const filterValues = { branchId: recordParamsAssociated.branchId, terminalId: recordParamsAssociated.terminalId };
			
			try {
				const response = await fetchRequest({ urlEndpoint: URL, queryString:getQueryString(filterValues, DELETE_ASSOCIATION),  method: "DELETE", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
			} catch (error) {
				console.error("ERROR", error);
			}
			break;
		}
		case DOWNLOAD_BPMN: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DOWNLOAD_API, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "GET", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if (response?.success) {
					downloadFile(response.valuesObj.fileContent,"application/xml",recordParams.fileName, "bpmn");
					setTimeout(() => {
						setOpenSnackBar(false);
					}, 3000);
				}
				
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;

		}

		default: return;
		}

	};
	
	return (
		<ModalTemplate
			titleModal={content?.titleModal}
			contentText={content?.contentText}
			open={open}
			setOpen={setOpen}
			handleSubmit={handleSubmit}
			loading={loading}
		/>
	);
};

export default ModalBpmn;
