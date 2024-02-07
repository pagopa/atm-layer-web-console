import React, { useContext, useState } from "react";
import { Alert, Grid, Snackbar, TextField } from "@mui/material";
import { UpgradeBpmnDto } from "../../../model/BpmnModel";
import { isValidDeployableFilename, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchUpgradeBpmn from "../../../hook/fetch/Bpmn/fetchUpgradeBpmn";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { UPGRADE_BPMN_PATH } from "../../../commons/endpoints";
import { UPGRADE_BPMN } from "../../../commons/constants";
import { ActionAlert } from "../../Commons/ActionAlert";
import ROUTES from "../../../routes";

export const UpgradeBpmn = () => {

	const { getFormOptions } = formOption();
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");

	const initialValues: UpgradeBpmnDto = {
		uuid: recordParams.bpmnId,
		file: undefined,
		filename: "",
		functionType: recordParams.functionType,
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>({
		file: "",
		filename: "",
	});
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? isValidDeployableFilename(formData.filename) ? "" : "filename non valido" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const handleSnackbar = (success: boolean) => {
		if (success) {
			setMessage("Operazione riuscita");
			setSeverity("success");
		} else {
			setMessage("Operazione fallita");
			setSeverity("error");
		}
		setOpenSnackBar(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {

		console.log("Error: ", errors);
		console.log("Body: ", formData);

		if (validateForm()) {

			const postData = new FormData();
			if (formData.uuid && formData.file && formData.filename && formData.functionType) {
				postData.append("uuid", formData.uuid);
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("functionType", formData.functionType);
			}

			try {
				const response = await fetchUpgradeBpmn({ abortController, body: postData, URL: UPGRADE_BPMN_PATH })();
				if (response?.success) {
					console.log("response", response);
					handleSnackbar(true);
				} else {
					handleSnackbar(false);
				}
			} catch (error) {
				console.error("ERROR", error);
				handleSnackbar(false);
			}
		}
	};

	return (
		<>
			<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(UPGRADE_BPMN)}>
				<UploadField
					titleField="File BPMN del processo"
					name={"file"}
					file={formData.file}
					clearFile={clearFile}
					error={errors.file}
					setFormData={setFormData}
					formData={formData} />
				<Grid xs={12} item my={1}>
					<TextField
						fullWidth
						id="filename"
						name="filename"
						label={"Nome del file"}
						placeholder={"Nome del file"}
						size="small"
						value={formData.filename}
						onChange={handleChange}
						error={Boolean(errors.filename)}
						helperText={errors.filename} />
				</Grid>
			</FormTemplate>
			<ActionAlert openSnackBar={openSnackBar} severity={severity} message={message} />
		</>

	);
};

export default UpgradeBpmn;
