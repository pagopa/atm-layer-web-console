import React, { SetStateAction, useContext, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { WR_DELETE, WR_DEPLOY, WR_DOWNLOAD, WR_ROLLBACK } from "../../../commons/endpoints";
import { getTextModal, handleSnackbar } from "../../Commons/Commons";
import ModalTemplate from "../template/ModalTemplate";
import { BPMN, DELETE_WR, DEPLOY_WR, DMN, DOWNLOAD_WR, FORM, ROLLBACK_WR, UPDATE_WR } from "../../../commons/constants";
import { downloadFile } from "../../../commons/decode";
import ModalTemplateUpload from "../template/ModalTemplateUpload";
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
const ModalWR = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) => {
	
	const { abortController } = useContext(Ctx);
	const content=getTextModal(type);
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);

		switch (type) {
		case ROLLBACK_WR: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_ROLLBACK, {workflowResourceId: recordParams.workflowResourceId }), method: "PUT", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DEPLOY_WR: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_DEPLOY, {workflowResourceId: recordParams.workflowResourceId }), method: "POST", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar,response?.valuesObj?.message);
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
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DELETE_WR: {
			try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_DELETE, {workflowResourceId: recordParams.workflowResourceId }) , method: "POST", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				setTimeout(() => {
					setOpenSnackBar(false);
					navigate(ROUTES.WORKFLOW_RESOURCES);
				}, 1000);				
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_WR: {
		    try {
				const response = await fetchRequest({ urlEndpoint: generatePath(WR_DOWNLOAD, {workflowResourceId: recordParams.workflowResourceId }), method: "GET", abortController })();
				setLoading(false);
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				if (response?.success) {
					setTimeout(() => {
						setOpenSnackBar(false);
					}, 3000);
					switch (recordParams.resourceType) {
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
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;    
		}
		default: return;
		};
	};


	return (
		<React.Fragment>
			{type === UPDATE_WR ?
				<ModalTemplateUpload
					titleModal={content?.titleModal}
					contentText={content?.contentText}
					open={open}
					setOpen={setOpen}
					recordParams={recordParams} 
					handleSnackbar={handleSnackbar} 
					abortController={abortController} 
					setMessage={setMessage} 
					setSeverity={setSeverity} 
					setTitle={setTitle} 
					setOpenSnackBar={setOpenSnackBar} 
					type={type}				
				/>
				:
				
				<ModalTemplate
					titleModal={content?.titleModal}
					contentText={content?.contentText}
					open={open}
					setOpen={setOpen}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			}

		</React.Fragment>
	);
};

export default ModalWR;