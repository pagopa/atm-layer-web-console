import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { ALERT_ERROR, ALERT_SUCCESS, CREATE_BPMN, MAX_LENGHT_LARGE } from "../../../commons/constants";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import checks from "../../../utils/checks";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_BPMN_API } from "../../../commons/endpoints";


export const CreateBpmn = () => {

	const [loadingButton, setLoadingButton] = useState(false);
	const { getFormOptions } = formOption();
	const { isValidDeployableFilename } = checks();

	const initialValues: BpmnDto = {
		file: undefined,
		filename: "",
		functionType: "",
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");


	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		resetErrors(errors, setErrors, e.target.name);
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? isValidDeployableFilename(formData.filename) ? "" : "Il nome del file deve essere privo di estensione, gli unici caratteri speciali ammessi sono _ e - " : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined, filename: "" });
	};



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = new FormData();
			if (formData.file && formData.filename && formData.functionType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("functionType", formData.functionType.toUpperCase());
			}
			setLoadingButton(true);
			try {
				const response = await fetchRequest({ urlEndpoint: CREATE_BPMN_API, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				if (response?.success){
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}

			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}

	};



	return (
		<FormTemplate
			setOpenSnackBar={setOpenSnackBar}
			handleSubmit={handleSubmit}
			getFormOptions={getFormOptions(CREATE_BPMN)}
			openSnackBar={openSnackBar}
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
				formData={formData}
				setErrors={setErrors} />

			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="filename"
					name="filename"
					label={"Nome del file"}
					placeholder={"Esempio_processo"}
					size="small"
					value={formData.filename}
					onChange={handleChange}
					error={Boolean(errors.filename)}
					helperText={errors.filename}
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Funzionalità"}
					placeholder={"MENU"}
					size="small"
					value={formData.functionType}
					onChange={handleChange}
					error={Boolean(errors.functionType)}
					helperText={errors.functionType}
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "function-type-test" }}
				/>
			</Grid>
		</FormTemplate>
	);
};

export default CreateBpmn;