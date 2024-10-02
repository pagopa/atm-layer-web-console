import { SetStateAction, useContext, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import React from "react";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar } from "../../Commons/Commons";
import { ALERT_ERROR, ALERT_SUCCESS, DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../../commons/constants";
import { RESOURCES_DELETE } from "../../../commons/endpoints";
import ModalTemplateUpload from "../template/ModalTemplateUpload";
import ModalTemplate from "../template/ModalTemplate";
import { downloadStaticFile } from "../../../commons/decode";
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
	detail: any;
};


export const ModalResources = ({ type, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle, detail }: Props) => {

	const { abortController } = useContext(Ctx);
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const content=getTextModal(type);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);
		switch (type) {
		case DELETE_RES: {
			try {
				const response = await fetchRequest({ 
					urlEndpoint: generatePath(RESOURCES_DELETE, { uuid: recordParams.resourceId }), 
					method: "POST", 
					abortController 
				})();
					
				setLoading(false);
				setOpen(false);
	
				handleSnackbar(
					response?.success ? ALERT_SUCCESS : ALERT_ERROR, 
					setMessage, 
					setSeverity, 
					setTitle, 
					setOpenSnackBar, 
					response?.valuesObj?.message
				);
	
				if (response?.success) {
					setTimeout(() => {
						setOpenSnackBar(false);
						navigate(ROUTES.RESOURCES);
					}, 3000);
				}
			} catch (error) {
				setLoading(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_RES: {
			const success = downloadStaticFile(detail);
			setOpen(false);
			setLoading(false);
	
			if (success) {
				handleSnackbar(ALERT_SUCCESS, setMessage, setSeverity, setTitle, setOpenSnackBar, "Operazione Riuscita");
			} else {
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, "Operazione Fallita");
			}
				
			if (success) {
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 3000);
			}
			break;
		}
		default: return;
		}
	};
	

	return (
		<React.Fragment>
			
			{type === UPDATE_RES ?
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

export default ModalResources;
