import React, { SetStateAction, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE, BPMN_DEPLOY_API, BPMN_DOWNLOAD_API, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import { DELETE, DELETE_ASSOCIATION, DEPLOY, DOWNLOAD } from "../../../commons/constants";
import { getQueryString, handleSnackbar } from "../../../utils/Commons";
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


export const Modal = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {

	const { abortController, debugOn } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {
		case DELETE: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }), method: "POST", abortController })();
		
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
				setTimeout(() => {
					setOpenSnackBar(false);
					window.location.reload();
				}, 4000);
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
			
			try {
				const response = await fetchRequest({ urlEndpoint: URL, queryString:getQueryString(filterValues, DELETE_ASSOCIATION),  method: "DELETE", abortController })();
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
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

	const modalConfigs = {
		DELETE: {
			titleModal: "Cancellazione risorsa di processo",
			contentText: "Sei sicuro di voler cancellare questa risorsa di proccesso?",
		},
		DEPLOY: {
			titleModal: "Rilascio risorsa di processo",
			contentText: "Sei sicuro di voler rilasciare questa risorsa di proccesso?",
		},
		DELETE_ASSOCIATION: {
			titleModal: "Eliminazione Associazione",
			contentText: "Sei sicuro di voler eliminare questa associazione?",
		},
		DOWNLOAD: {
			titleModal: "Scarica risorsa di processo",
			contentText: "Sei sicuro di voler scaricare questa risorsa?",
		},
	};
	
	return (
		<>
			{Object.keys(modalConfigs).map((key) => (
				type === key && (
					<ModalTemplate
						key={key}
						titleModal={modalConfigs[key as keyof typeof modalConfigs].titleModal}
						contentText={modalConfigs[key as keyof typeof modalConfigs].contentText}
						open={open}
						setOpen={setOpen}
						handleSubmit={handleSubmit}
					/>
				)
			))}

		</>
	);
};

export default Modal;
