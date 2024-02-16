import React, { SetStateAction, useContext } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { WR_DEPLOY, WR_DOWNLOAD, WR_ROLLBACK, WR_UPDATE } from "../../../commons/endpoints";
import { handleSnackbar } from "../../../utils/Commons";
import ModalTemplate from "../template/ModalTemplate";
import fetchUpdateWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchUpdateWorkflowResource";
import fetchRollbackWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchRollbackWorkflowResource";
import fetchDeployWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchDeployWorkflowResource";
import { BPMN, DEPLOY_WR, DMN, DOWNLOAD_WR, FORM, ROLLBACK_WR, UPDATE_WR } from "../../../commons/constants";
import fetchDownloadWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchDownloadWorkflowResource";
import { downloadFile } from "../../../commons/decode";

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
export const ModalWR = ({ type, open, setOpen, openSnackBar, setOpenSnackBar, severity, setSeverity, message, setMessage, title, setTitle }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {
		case UPDATE_WR: {
			try {
				const response = await fetchUpdateWorkflowResource({ abortController, URL: generatePath(WR_UPDATE, {workflowResourceId: recordParams.workflowResourceId }) }) ();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
					console.log(response);
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case ROLLBACK_WR: {
			try {
				const response = await fetchRollbackWorkflowResource({ abortController, URL: generatePath(WR_ROLLBACK, {workflowResourceId: recordParams.workflowResourceId }) }) ();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
					console.log(response);
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DEPLOY_WR: {
			try {
				const response = await fetchDeployWorkflowResource({ abortController, URL: generatePath(WR_DEPLOY, {workflowResourceId: recordParams.workflowResourceId }) }) ();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
					console.log(response);
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_WR: {
		    try {
		        const response = await fetchDownloadWorkflowResource({ abortController, URL: generatePath(WR_DOWNLOAD, {workflowResourceId: recordParams.workflowResourceId }) }) ();
				if (response?.success) {
					setOpen(false);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
					switch (recordParams.resourceS3Type) {
					case BPMN: {
						downloadFile(response.valuesObj.fileContent,"application/xml",recordParams.fileName, "bpmn");
						break;
					} 
					case DMN: {
						downloadFile(response.valuesObj.fileContent,"application/xml",recordParams.fileName, "dmn");
						break;
					}
					case FORM: {
						downloadFile(response.valuesObj.fileContent,"application/json",recordParams.fileName, "form");
						break;
					}
					default: return;
					}
					
					
				} else {
					setOpen(false);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		    
		}
		default: return;
		};
	};
	return (
		<>
			{type === UPDATE_WR &&
				<ModalTemplate
					titleModal={"Update risorsa aggiuntiva per processo"}
					contentText={"Carica il file aggiornato"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>
			}
			{type === ROLLBACK_WR &&
				<ModalTemplate
					titleModal={"Ripristino risorsa aggiuntiva per processo"}
					contentText={"Sei sicuro di voler ripristinare la versione precedente della risorsa?"}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
				/>
			}
			{type === DEPLOY_WR &&
                <ModalTemplate
                	titleModal={"Rilascio risorsa aggiuntiva per processo"}
                	contentText={"Sei sicuro di voler rilasciare questa risorsa aggiuntiva di processo?"}
                	open={open}
                	setOpen={setOpen}
                	handleSubmit={handleSubmit}
                />
			}
			{type === DOWNLOAD_WR &&
                <ModalTemplate
                	titleModal={"Scarica risorsa aggiuntiva di processo"}
                	contentText={"Sei sicuro di voler scaricare questa risorsa aggiuntiva di processo?"}
                	open={open}
                	setOpen={setOpen}
                	handleSubmit={handleSubmit}
                />
			}
		</>
	);
};

export default ModalWR;