import React, { SetStateAction, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { BPMN_ASSOCIATE_API, BPMN_DEPLOY_API, BPMN_DOWNLOAD_API, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import fetchDeleteAssociatedBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmnAssociated";
import { DELETE, DELETE_ASSOCIATION, DEPLOY, DOWNLOAD, UPDATE_ASSOCIATION } from "../../../commons/constants";
import { getQueryString, handleSnackbar } from "../../../utils/Commons";
import ModalTemplate from "../template/ModalTemplate";
import { downloadFile } from "../../../commons/decode";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";


type Props = {
	type: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openSnackBar?: boolean;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	severity?: any;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	message?: string;
	setMessage: React.Dispatch<SetStateAction<string>>;
	title?: string;
	setTitle: React.Dispatch<SetStateAction<string>>;
};


export const Modal = ({ type, open, setOpen, openSnackBar, setOpenSnackBar, severity, setSeverity, message, setMessage, title, setTitle }: Props) => {

	const { abortController, debugOn } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {
		case DELETE: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DEPLOY_API, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
		
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DEPLOY: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DEPLOY_API, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
			
				if (response?.success) {
					const deployedResponse = {
						...response.valuesObj,
						fileName: response.valuesObj?.resourceFile?.fileName
					};
					localStorage.setItem("recordParams", JSON.stringify(deployedResponse));
				}
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DELETE_ASSOCIATION: {
			const recordParamsAssociated = JSON.parse(localStorage.getItem("recordParamsAssociated") ?? "");
			const baseUrl = generatePath(DELETE_ASSOCIATE_BPMN, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
			const URL = `${baseUrl}?acquirerId=${recordParamsAssociated.acquirerId}`;
			const filterValues = { branchId: recordParamsAssociated.branchId, terminalId: recordParamsAssociated.terminalId };
			const url = getQueryString(URL, filterValues, DELETE_ASSOCIATION);

			try {
				const response = await fetchDeleteAssociatedBpmn({ abortController, url })();
				// const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_ASSOCIATE_API,{ bpmnId: recordParams?.bpmnId, modelVersion: recordParams?.modelVersion }), method: "POST", abortController, body: formData, headers: { "Content-Type" : "application/json" } })();
				
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				}

			} catch (error) {
				console.error("ERROR", error);
			}
			break;
		}
		case DOWNLOAD: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DOWNLOAD_API, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "GET", abortController })();

				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				if (response?.success) {
					downloadFile(response.valuesObj.fileContent,"application/xml",recordParams.fileName, "bpmn");
				} 
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;

		}

		default: return;
		}

	};

	return (
		<>
			{type === DELETE &&
				<ModalTemplate
					titleModal={"Cancellazione risorsa di processo"}
					contentText={"Sei sicuro di voler cancellare questa risorsa di proccesso?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>
			}
			{type === DEPLOY &&

				<ModalTemplate
					titleModal={"Rilascio risorsa di processo"}
					contentText={"Sei sicuro di voler rilasciare questa risorsa di proccesso?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>

			}
			{type === DELETE_ASSOCIATION &&
				<ModalTemplate
					titleModal={"Eliminazione Associazione"}
					contentText={"Sei sicuro di voler eliminare questa associazione?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>

			}
			{type === DOWNLOAD &&
				<ModalTemplate
					titleModal={"Scarica risorsa di processo"}
					contentText={"Sei sicuro di voler scaricare questa risorsa?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>

			}
			{type === UPDATE_ASSOCIATION &&
				<ModalTemplate
					titleModal={"Modifica Associazione"}
					contentText={"Sei sicuro di voler modificare questa associazione?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>
			}
		</>
	);
};

export default Modal;
