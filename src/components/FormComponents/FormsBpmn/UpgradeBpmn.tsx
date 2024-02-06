import React, { useContext, useRef, useState } from "react";
import { Alert, Grid, Snackbar, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { UpgradeBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchUpgradeBpmn from "../../../hook/fetch/Bpmn/fetchUpgradeBpmn";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import ROUTES from "../../../routes";
import { UPGRADE_BPMN_PATH } from "../../../commons/endpoints";
import { UPGRADE_BPMN } from "../../../commons/constants";

export const UpgradeBpmn = () => {
	// const theme = useTheme();
	const { bpmnId } = useParams();

	const { getFormOptions } = formOption();

	const initialValues: UpgradeBpmnDto = {
		uuid: bpmnId,
		file: undefined,
		fileName: undefined,
		functionType: undefined,
	};

	const [formData, setFormData] = useState<UpgradeBpmnDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	const handleSubmit = async (e: React.FormEvent) => {
	
		if (validateForm()) {
			try {
				const response = await fetchUpgradeBpmn({ abortController, body: formData, URL: UPGRADE_BPMN_PATH })();
				if(response?.success) {
					console.log("response", response);
					setOpenSnackBar(true);
				}
			} catch (error) {
				console.error("ERROR", error);
			}
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(UPGRADE_BPMN)}>
			<UploadField
				titleField="File BPMN del processo"
				name={"file"}
				file={formData.file}
				changeFile={handleChange}
				clearFile={clearFile}
				error={errors.file} />
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="fileName"
					name="fileName"
					label={"Nome del file"}
					placeholder={"Nome del file"}
					size="small"
					value={formData.fileName}
					onChange={handleChange}
					error={Boolean(errors.fileName)}
					helperText={errors.fileName} />
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Funzionalità"}
					placeholder={"Funzionalità"}
					size="small"
					value={formData.functionType}
					onChange={handleChange}
					error={Boolean(errors.functionType)}
					helperText={errors.functionType} />
			</Grid>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={openSnackBar}
				onClose={() => setOpenSnackBar(false)}
				message={message}

			>
				<Alert severity="success">This is a success Alert.</Alert>
			</Snackbar>
		</FormTemplate>

	);
};

export default UpgradeBpmn;
