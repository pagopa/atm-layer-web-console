import React, { SetStateAction, useContext } from "react";
import { generatePath } from "react-router-dom";
import fetchDeleteBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmn";
import { Ctx } from "../../../DataContext";
import { BPMN_DELETE, BPMN_DEPLOY, BPMN_DOWNLOAD, DELETE_ASSOCIATE_BPMN } from "../../../commons/endpoints";
import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";
import fetchDeleteAssociatedBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmnAssociated";
import { DELETE, DELETE_ASSOCIATION, DEPLOY, DOWNLOAD, UPDATE_ASSOCIATION } from "../../../commons/constants";
import { getQueryString } from "../../../utils/Commons";
import fetchDownloadBpmn from "../../../hook/fetch/Bpmn/fetchDownloadBpmn";
import ModalTemplate from "../template/ModalTemplate";


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

	const { abortController } = useContext(Ctx);
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const handleSnackbar = (success: boolean) => {
		if (success) {
			setMessage("Operazione riuscita");
			setSeverity("success");
			setTitle("Successo");
		} else {
			setMessage("Operazione fallita");
			setSeverity("error");
			setTitle("Errore");
		}
		setOpenSnackBar(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {

		switch (type) {
		case DELETE: {
			try {
				const response = await fetchDeleteBpmn({ abortController, URL: generatePath(BPMN_DELETE, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);
				} else {
					setOpen(false);
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
			}
			break;
		}
		case DEPLOY: {
			try {
				const response = await fetchDeployBpmn({ abortController, URL: generatePath(BPMN_DEPLOY, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);

				} else {
					setOpen(false);
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
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
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);
				} else {
					setOpen(false);
					handleSnackbar(false);
				}

			} catch (error) {
				console.error("ERROR", error);
			}
			break;
		}
		case DOWNLOAD: {
			try {
				const response = await fetchDownloadBpmn({ abortController, URL: generatePath(BPMN_DOWNLOAD, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }) })();
				if (response?.success) {
					console.log("response", response);
					setOpen(false);
					handleSnackbar(true);
				} else {
					setOpen(false);
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
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
