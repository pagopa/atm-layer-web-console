import { SetStateAction, useContext, useState } from "react";
import { generatePath } from "react-router-dom";
import React from "react";
import { Ctx } from "../../../DataContext";
import { getTextModal, handleSnackbar } from "../../Commons/Commons";
import { DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../../commons/constants";
import { RESOURCES_DELETE } from "../../../commons/endpoints";
import ModalTemplateUpload from "../template/ModalTemplateUpload";
import ModalTemplate from "../template/ModalTemplate";
import { downloadStaticFile } from "../../../commons/decode";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";


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
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const content=getTextModal(type);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);
		switch (type) {
		case DELETE_RES: {
			try {
				const response = await fetchRequest({ urlEndpoint:  generatePath(RESOURCES_DELETE, { uuid: recordParams.resourceId }), method: "POST", abortController })();
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
		case DOWNLOAD_RES: {
			const success = downloadStaticFile(detail);
			setOpen(false);
			if (success) {
				handleSnackbar(success, setMessage, setSeverity, setTitle, setOpenSnackBar, "Operazione Riuscita");
			} else {
				handleSnackbar(success, setMessage, setSeverity, setTitle, setOpenSnackBar, "Operazione Fallita");
			}
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 3000);
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
