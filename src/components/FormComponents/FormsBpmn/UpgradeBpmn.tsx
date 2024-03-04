import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { UpgradeBpmnDto } from "../../../model/BpmnModel";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { UPGRADE_BPMN_PATH } from "../../../commons/endpoints";
import { MAX_LENGHT_LARGE, UPGRADE_BPMN } from "../../../commons/constants";
import checks from "../../../utils/checks";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";

export const UpgradeBpmn = () => {

	const [loadingButton, setLoadingButton] = useState(false);
	const { getFormOptions } = formOption();
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const { isValidDeployableFilename } = checks();

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
	const [title, setTitle] = useState("");

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

	const handleSubmit = async (e: React.FormEvent) => {

		if (validateForm()) {

			const postData = new FormData();
			if (formData.uuid && formData.file && formData.filename && formData.functionType) {
				postData.append("uuid", formData.uuid);
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("functionType", formData.functionType);
			}
			setLoadingButton(true);

			try {
				const response = await fetchRequest({ urlEndpoint: UPGRADE_BPMN_PATH, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);

			} catch (error) {
				setLoadingButton(false);
				console.error("ERROR", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
	};

	return (
		<FormTemplate
			handleSubmit={handleSubmit}
			getFormOptions={getFormOptions(UPGRADE_BPMN)}
			openSnackBar={openSnackBar}
			setOpenSnackBar={setOpenSnackBar}
			severity={severity}
			message={message}
			title={title}
			loadingButton={loadingButton}
		>
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
					InputProps={{ inputProps: { MAX_LENGHT_LARGE } }}
					fullWidth
					id="filename"
					name="filename"
					label={"Nome del file"}
					placeholder={"Esempio_Processo"}
					size="small"
					value={formData.filename}
					onChange={handleChange}
					error={Boolean(errors.filename)}
					helperText={errors.filename} />
			</Grid>
		</FormTemplate>
	);
};

export default UpgradeBpmn;
