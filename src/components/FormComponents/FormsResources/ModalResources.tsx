import { SetStateAction, useContext } from "react";
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
	


	const handleSubmit = async (e: React.FormEvent) => {
		switch (type) {
		case DELETE_RES: {
			try {
				const response = await fetchRequest({ urlEndpoint:  generatePath(RESOURCES_DELETE, { uuid: recordParams.resourceId }), method: "POST", abortController })();
				setOpen(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
			break;
		}
		case DOWNLOAD_RES: {
			downloadStaticFile(detail);
			setOpen(false);
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
				/>
			}
		</React.Fragment>
	);
};

export default ModalResources;
