import React, { SetStateAction, useContext, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE, BPMN_DEPLOY_API, BPMN_DOWNLOAD_API, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import { ALERT_ERROR, ALERT_SUCCESS, DELETE_ASSOCIATION, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN } from "../../../commons/constants";
import { getQueryString, getTextModal, handleSnackbar } from "../../Commons/Commons";
import ModalTemplate from "../template/ModalTemplate";
import { downloadFile } from "../../../commons/decode";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import ROUTES from "../../../routes";


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

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const navigate = useNavigate();

	const content = getTextModal(type);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);

		switch (type) {
		case DELETE_BPMN: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if(response.status === 204) {
					setTimeout(() => {
						setOpenSnackBar(false);
						navigate(ROUTES.BPMN);
					}, 1000);
				}
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DELETE_ASSOCIATION: {
			const recordParamsAssociated = JSON.parse(sessionStorage.getItem("recordParamsAssociated") ?? "");
			const baseUrl = generatePath(DELETE_ASSOCIATE_BPMN, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
			const URL = `${baseUrl}?acquirerId=${recordParamsAssociated.acquirerId}`;
			const filterValues = { branchId: recordParamsAssociated.branchId, terminalId: recordParamsAssociated.terminalId };

			try {
				const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, DELETE_ASSOCIATION), method: "DELETE", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				if(response?.success){
					setTimeout(() => {
						setOpenSnackBar(false);
						window.location.reload();
					}, 1000);
				}
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
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if (response?.success) {
					downloadFile(response.valuesObj.fileContent, "application/xml", recordParams.fileName, "bpmn");
					setTimeout(() => {
						setOpenSnackBar(false);
					}, 3000);
				}

			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;

		}

		default: { return null; }
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
