import React, { forwardRef, useState }  from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";
import { generatePath } from "react-router";
import UploadField from "../UploadField";
import { RESOURCES_UPDATE, WR_UPDATE } from "../../../commons/endpoints";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { UPDATE_RES, UPDATE_WR } from "../../../commons/constants";
import fetchUpdateResources from "../../../hook/fetch/Resources/fetchUpdateResources";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";

type Props = {
	type: string;
	titleModal: string;
	contentText: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSnackbar: any;
	abortController: any;
	recordParams: any;
	setMessage: any; 
	setSeverity: any; 
	setTitle: any;
	setOpenSnackBar: any;
};

export default function ModalTemplateUpload({ type, titleModal, contentText, open, setOpen, recordParams, handleSnackbar, abortController, setMessage, setSeverity, setTitle, setOpenSnackBar}: Props) {

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
		};
	

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const initialValues: WRUpdateDto = {
		uuid: recordParams.workflowResourceId,
		file: undefined,
	};
	
	const [errors, setErrors] = useState<any>(initialValues);

	const [formData, setFormData] = useState<WRUpdateDto>(initialValues);
	
	const handleSubmit = async () => {
		if (validateForm()) {
			const postData = new FormData();
	
			if (formData.file) {
				postData.append("uuid", formData.uuid);
				postData.append("file", formData.file);
			}
			switch (type) {
			case UPDATE_WR:{
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(WR_UPDATE, { workflowResourceId: recordParams.workflowResourceId }), method: "PUT", abortController, body: postData, isFormData:true })();
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);					
				} catch (error) {
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
				break;
			}
			case UPDATE_RES: {
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }), method: "PUT", abortController, body: postData, isFormData:true })();
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				} catch (error) {
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				}
				break;
			}
			default: return;
			}
			
		};
		
	};
	
	

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			fullWidth
			maxWidth={"sm"}
		>
			<DialogTitle>
				{titleModal}
			</DialogTitle>
			<Divider />
			<Box py={2}>
				<DialogContent>
					<DialogContentText>
						{contentText}
					</DialogContentText>
					{type === UPDATE_WR &&
					<UploadField
						titleField="File Aggiuntivo per processo"
						name={"file"}
						file={formData.file}
						clearFile={clearFile}
						error={errors.file}
						setFormData={setFormData}
						formData={formData} 
					/>}
					{type === UPDATE_RES &&
					<UploadField 
						titleField="File Risorsa statica"
						name={"file"}
						file={formData.file}
						clearFile={clearFile}
						error={errors.file}
						setFormData={setFormData}
						formData={formData} 
					/>}
				</DialogContent>
			</Box>
			<DialogActions >
				<Box display={"flex"} flexDirection={"row"} p={2}>
					<Box mr={2}>
						<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
					</Box>
					<Box>
						<Button variant={"contained"} onClick={handleSubmit}>Conferma</Button>
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
