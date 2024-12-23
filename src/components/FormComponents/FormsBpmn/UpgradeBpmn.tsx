import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UpgradeBpmnDto } from "../../../model/BpmnModel";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { UPGRADE_BPMN_PATH } from "../../../commons/endpoints";
import { ALERT_ERROR, ALERT_SUCCESS, MAX_LENGHT_LARGE, UPGRADE_BPMN } from "../../../commons/constants";
import checks from "../../../utils/checks";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import ROUTES from "../../../routes";

export const UpgradeBpmn = () => {

	const [loadingButton, setLoadingButton] = useState(false);
	const { getFormOptions } = formOption();
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const { isValidDeployableFilename } = checks();
	const navigate = useNavigate();

	const initialValues: UpgradeBpmnDto = {
		uuid: recordParams.bpmnId,
		file: undefined,
		filename: "",
		functionType: recordParams.functionType,
	};

	const [definitionKeyValue, setDefinitionKeyValue] = useState("");
	useEffect(() => {
		const value = recordParams.definitionKey;
		if (value) {
			setDefinitionKeyValue(value);
		}
	  }, []);

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
		const fileError = formData.file
			? formData.file.size > 1 * 1024 * 1024
				? "I file devono avere dimensione massima di 1MB"
				: ""
			: "Campo obbligatorio";
	
		if (fileError && fileError.includes("1MB")) {
			handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, fileError);
		}
	
		const newErrors = {
			file: fileError,
			filename: formData.filename
				? isValidDeployableFilename(formData.filename)
					? ""
					: "filename non valido"
				: "Campo obbligatorio",
		};
	
		setErrors(newErrors);
	
		// Verifica se ci sono altri errori oltre a quello del file.
		return Object.values(newErrors).every((error) => !error);
	};
	

	const clearFile = () => {
		setFormData({ ...formData, file: undefined, filename: "" });
		setErrors((prevErrors: any) => ({ ...prevErrors, file: "" }));
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
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);


			} catch (error) {
				setLoadingButton(false);
				console.error("ERROR", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
				titleField="File BPMN del processo*"
				name={"file"}
				file={formData.file}
				clearFile={clearFile}
				error={errors.file}
				setFormData={setFormData}
				formData={formData}
				setErrors={setErrors} />
			<Grid xs={12} item my={1}>
				<TextField
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
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
			<Typography variant="body1" style={{ fontStyle: "italic" }}>{`* il file deve avere id: ${definitionKeyValue}`}</Typography>
		</FormTemplate>
	);
};

export default UpgradeBpmn;
