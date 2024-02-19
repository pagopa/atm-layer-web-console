import React, { forwardRef, useState }  from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { generatePath } from "react-router";
import UploadField from "../UploadField";
import fetchUpdateWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchUpdateWorkflowResource";
import { RESOURCES_UPDATE, WR_UPDATE } from "../../../commons/endpoints";
import { resetErrors } from "../../../utils/Commons";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { UPDATE_RES, UPDATE_WR } from "../../../commons/constants";
import fetchUpdateResources from "../../../hook/fetch/Resources/fetchUpdateResources";

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

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalTemplateUpload({ type, titleModal, contentText, open, setOpen, recordParams, handleSnackbar, abortController, setMessage, setSeverity, setTitle, setOpenSnackBar}: Props) {

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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
					const response = await fetchUpdateWorkflowResource({ abortController, body: postData, URL: generatePath(WR_UPDATE, { workflowResourceId: recordParams.workflowResourceId }) }) ();
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
			case UPDATE_RES: {
				try {
					const response = await fetchUpdateResources({ abortController, body:postData, URL: generatePath(RESOURCES_UPDATE, { resourceId: recordParams.resourceId }) })();
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
			default: return;
			}
			
		};
		
	};
	
	

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
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
