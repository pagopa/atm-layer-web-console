import React, { useEffect, useState }  from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material";
import { generatePath } from "react-router";
import UploadField from "../UploadField";
import { RESOURCES_UPDATE, WR_UPDATE } from "../../../commons/endpoints";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { ALERT_ERROR, ALERT_SUCCESS, UPDATE_RES, UPDATE_WR } from "../../../commons/constants";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { Loading } from "../../Commons/Loading";

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
	const [definitionKeyValue, setDefinitionKeyValue] = useState("");
	useEffect(() => {
		const value = recordParams.definitionKey;
		if (value) {
			setDefinitionKeyValue(value);
		}
	  }, []);

	const initialValues: WRUpdateDto = {
		uuid: recordParams.workflowResourceId,
		file: undefined,
	};

	const wrongExtensionMessage = "Il file che hai caricato ha un' estensione diversa da quello che stai cercando di aggiornare.";
	
	const [errors, setErrors] = useState<any>(initialValues);

	const [formData, setFormData] = useState<WRUpdateDto>(initialValues);

	const [loadingButton, setLoadingButton] = useState(false);
	
	const handleSubmit = async () => {
		if (validateForm()) {
			const postData = new FormData();
	
			if (formData.file) {
				postData.append("uuid", formData.uuid);
				postData.append("file", formData.file);
			}
			setLoadingButton(true);
			switch (type) {
			case UPDATE_WR:{
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(WR_UPDATE, { workflowResourceId: recordParams.workflowResourceId }), method: "PUT", abortController, body: postData, isFormData:true })();
					setLoadingButton(false);
					setOpen(false);
					handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
					setFormData(initialValues);
					if (response?.success) {
						const updatedResponse = {
							...response.valuesObj,
							fileName: response.valuesObj?.resourceFile?.fileName
						};
						sessionStorage.setItem("recordParams", JSON.stringify(updatedResponse));
						setTimeout(() => {
							setOpenSnackBar(false);
							window.location.reload();
						}, 1000);
					} 
				} catch (error) {
					setLoadingButton(false);
					console.error("ERROR", error);
					handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} finally {
					setFormData(initialValues);
				}
				break;
			}
			case UPDATE_RES: {
				if (formData.file) {
					// eslint-disable-next-line functional/immutable-data
					const uploadedFileExtension = formData.file.name.split(".").pop()?.toLowerCase();

					const sessionStorageFileExtension = recordParams.cdnUrl.split(".").pop()?.toLowerCase();
				
					if (uploadedFileExtension !== sessionStorageFileExtension) {
					  setShowAlert(true);
					  setLoadingButton(false);
					  return;
					}
				  }
				try {
					const response = await fetchRequest({ urlEndpoint: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }), method: "PUT", abortController, body: postData, isFormData:true })();
					setLoadingButton(false);
					setOpen(false);
					handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
					if (response?.success) {
						const updatedResponse = {
							...response.valuesObj,
							fileName: response.valuesObj?.resourceFile?.fileName,
							storageKey: response.valuesObj?.resourceFile?.storageKey
						};
						sessionStorage.setItem("recordParams", JSON.stringify(updatedResponse));
						setTimeout(() => {
							setOpenSnackBar(false);
							window.location.reload();
						}, 1000);
					}
				} catch (error) {
					setLoadingButton(false);
					console.error("ERROR", error);
					handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
							setErrors={setErrors}
						/>
						{definitionKeyValue &&
						<Typography variant="body1" style={{ fontStyle: "italic" }}>{`* il file deve avere id: ${definitionKeyValue}`}</Typography>}
						{showAlert && 
						<Alert severity="error" sx={{fontWeight: "normal"}}>
							{wrongExtensionMessage}
						</Alert>}
					</Box>
				</DialogContent>
			</Box>
			<DialogActions >
				<Box display={"flex"} flexDirection={"row"} p={2}>
					<Box mr={2}>
						<Button  variant={"outlined"}  onClick={() => { setOpen(false); setFormData(initialValues); setShowAlert(false); }}>Annulla</Button>
					</Box>
					<Box>

						<Button variant={"contained"} onClick={handleSubmit} disabled={showAlert}>
							{loadingButton ? <Loading size={20} thickness={5} marginTop={"0px"} color={"white"} /> : "Conferma"}
						</Button>

					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
