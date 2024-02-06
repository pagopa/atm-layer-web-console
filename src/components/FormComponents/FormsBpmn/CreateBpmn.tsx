import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchCreateBpmn from "../../../hook/fetch/Bpmn/fetchCreateBpmn";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { CREATE_BPMN } from "../../../commons/constants";
import { isValidDeployableFilename, resetErrors } from "../../../utils/Commons";

export const CreateBpmn = () => {

	const { getFormOptions } = formOption();

	const initialValues: BpmnDto = {
		file: undefined,
		filename: "",
		functionType: "",
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);


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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = new FormData();
			if (formData.file) {
				postData.append("file", formData.file);
			}
			postData.append("filename", formData.filename.replace(" ", ""));
			postData.append("functionType", formData.functionType);

			fetchCreateBpmn({ abortController, body: postData })().then(data => {
				if (data?.success) {
					console.log("Response positive: ", data);

				}
			}).catch(() => {
				console.log("Response negative: ");

			});
		}
	};



	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_BPMN)}>
			<UploadField
				titleField="File BPMN del processo"
				name={"file"}
				file={formData.file}
				clearFile={clearFile}
				error={errors.file}
				setFormData={setFormData}
				formData={formData}
			/>
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
					helperText={errors.functionType}
				/>
			</Grid>

		</FormTemplate>
	);
};

export default CreateBpmn;