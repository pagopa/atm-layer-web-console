import React, { SetStateAction, useContext } from "react";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { WR_DELETE, WR_DEPLOY, WR_DOWNLOAD, WR_ROLLBACK } from "../../../commons/endpoints";
import { handleSnackbar } from "../../../utils/Commons";
import ModalTemplate from "../template/ModalTemplate";
import { BPMN, DELETE_WR, DEPLOY_WR, DMN, DOWNLOAD_WR, FORM, ROLLBACK_WR, UPDATE_WR } from "../../../commons/constants";
import { downloadFile } from "../../../commons/decode";
import fetchDeleteWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchDeleteWorkflowResource";
import ModalTemplateUpload from "../template/ModalTemplateUpload";
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
export const ModalWR = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {

		case ROLLBACK_WR: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_ROLLBACK, {workflowResourceId: recordParams.workflowResourceId }), method: "PUT", abortController })();

				// const response = await fetchRollbackWorkflowResource({ abortController, URL: generatePath(WR_ROLLBACK, {workflowResourceId: recordParams.workflowResourceId }) }) ();
				
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DEPLOY_WR: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_DEPLOY, {workflowResourceId: recordParams.workflowResourceId }), method: "POST", abortController })();
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar,response?.valuesObj?.message);
				if (response?.success) {
					const deployedResponse = {
						...response.valuesObj,
						fileName: response.valuesObj?.resourceFile?.fileName
					};
					localStorage.setItem("recordParams", JSON.stringify(deployedResponse));
				} 
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DELETE_WR: {
			try {
				const response = await fetchDeleteWorkflowResource({ abortController, URL: generatePath(WR_DELETE, {workflowResourceId: recordParams.workflowResourceId }) }) ();

				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_WR: {
		    try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_DOWNLOAD, {workflowResourceId: recordParams.workflowResourceId }), method: "GET", abortController })();
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				if (response?.success) {
					
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
				<ModalTemplateUpload
					titleModal={"Update risorsa aggiuntiva per processo"}
					contentText={"Carica il file aggiornato"}
					open={open}
					setOpen={setOpen}
					recordParams={recordParams} handleSnackbar={handleSnackbar} abortController={abortController} setMessage={setMessage} setSeverity={setSeverity} setTitle={setTitle} setOpenSnackBar={setOpenSnackBar} type={UPDATE_WR}				/>
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
			{type === DELETE_WR &&
				<ModalTemplate
					titleModal={"Cancellazione risorsa aggiuntiva per processo"}
					contentText={"Sei sicuro di voler cancellare questa risorsa aggiuntiva di processo?"}
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