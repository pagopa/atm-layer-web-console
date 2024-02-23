import React, { useState }  from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";
import { generatePath } from "react-router";
import { LoadingButton } from "@mui/lab";
import UploadField from "../UploadField";
import { RESOURCES_UPDATE, WR_UPDATE } from "../../../commons/endpoints";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { UPDATE_RES, UPDATE_WR } from "../../../commons/constants";
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

	const [showAlert, setShowAlert] = useState(false);

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
		setShowAlert(false);
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

	const [loading, setLoading] = useState(false);
	
	const handleSubmit = async () => {
		setLoading(true);
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
					setLoading(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
					setFormData(initialValues);
					
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} finally {
					setFormData(initialValues);
				}
				break;
			}
			case UPDATE_RES: {
				if (formData.file) {
					// eslint-disable-next-line functional/immutable-data
					const uploadedFileExtension = formData.file.name.split(".").pop()?.toLowerCase();

					const localStorageFileExtension = recordParams.cdnUrl.split(".").pop()?.toLowerCase();
				
					if (uploadedFileExtension !== localStorageFileExtension) {
					  setShowAlert(true);
					  return;
					}
				  }
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }), method: "PUT", abortController, body: postData, isFormData:true })();
					setLoading(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				} catch (error) {
					setLoading(false);
					console.error("ERROR", error);
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} finally {
					setFormData(initialValues);
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
					{contentText&&
						<DialogContentText>
							{contentText}
						</DialogContentText>
					}
					<Box mt={2}>
						<UploadField
							name={"file"}
							file={formData.file}
							clearFile={clearFile}
							error={errors.file}
							setFormData={setFormData}
							formData={formData} 
						/>
						{showAlert && 
						<Alert severity="error">
							Il file che hai caricato ha un estensione diversa da quello che stai cercando di aggiornare.
						</Alert>}
					</Box>
				</DialogContent>
			</Box>
			<DialogActions >
				<Box display={"flex"} flexDirection={"row"} p={2}>
					<Box mr={2}>
						<Button  variant={"outlined"}  onClick={() => {setOpen(false); setFormData(initialValues);}}>Annulla</Button>
					</Box>
					<Box>
						<LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Conferma</LoadingButton>
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
