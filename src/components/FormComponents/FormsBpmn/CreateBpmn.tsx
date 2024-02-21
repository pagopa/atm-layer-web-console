import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { CREATE_BPMN } from "../../../commons/constants";
import { handleSnackbar, resetErrors } from "../../../utils/Commons";
import checks from "../../../utils/checks";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_BPMN_API } from "../../../commons/endpoints";


export const CreateBpmn = () => {

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
			filename: formData.filename ? isValidDeployableFilename(formData.filename) ? "" : "filename non valido" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = new FormData();
			if (formData.file && formData.filename && formData.functionType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("functionType", formData.functionType);
			}
			try {
				const response = await fetchRequest({ urlEndpoint: CREATE_BPMN_API, method: "POST", abortController, body: postData, isFormData:true })();
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				
			} catch (error) {
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
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
					fullWidth
					id="filename"
					name="filename"
					label={"Nome del file"}
					placeholder={"Esempio_processo"}
					size="small"
					value={formData.filename}
					onChange={handleChange}
					error={Boolean(errors.filename)}
					helperText={errors.filename} />
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
					helperText={errors.functionType} />
			</Grid>
		</FormTemplate>
	);
};

export default CreateBpmn;