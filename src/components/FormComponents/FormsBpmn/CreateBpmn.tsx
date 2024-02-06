import React, { useContext, useRef, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchCreateBpmn from "../../../hook/fetch/Bpmn/fetchCreateBpmn";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { CREATE_BPMN } from "../../../commons/constants";
import { deployableFilename, isValidDeployableFilename, resetErrors } from "../../../utils/Commons";


export const CreateBpmn = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues = {
		file: "",
		fileName: "",
		functionType: "",
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const { abortController } = useContext(Ctx);
	

	const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		resetErrors(errors, setErrors, e.target.name);
		setFormData((prevFormData) => ({
			...prevFormData, 
			[name]: value }));
	};


	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	// const handleSubmit = async (e: React.FormEvent) => {

	// 	if (validateForm()) {
	// 		try {
	// 			const data2Send = new URLSearchParams();
	// 			data2Send.set("file", formData.file);
	// 			data2Send.set("fileName", formData.fileName);
	// 			data2Send.set("functionType", formData.functionType);
	// 			const response = await fetchCreateBpmn({ abortController, body: data2Send})();

	// 			if (response?.success) {
	// 				console.log("Response positive: ", response.valuesObj);
	// 			}
	// 		} catch (error) {
	// 			console.error("ERROR", error);
	// 		}
	// 	}
	// };
	function createBpmn(){
		const postData = new FormData();
		postData.append("file", formData.file);
		postData.append("fileName", formData.fileName);
		postData.append("functionType", formData.functionType);
		
		fetchCreateBpmn({ abortController, body:postData })().then(data => {
			if (data?.success) {
				console.log("Response positive: ", data);
				
			}
		}).catch(() => {
			console.log("Response negative: ");
			
		});		
	
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			createBpmn();
		}
	};



	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_BPMN)}>
			<UploadField
				titleField="File BPMN del processo"
				name={"file"}
				file={formData.file}
				changeFile={handleChange}
				clearFile={clearFile}
				error={errors.file}
			/>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="fileName"
					name="fileName"
					label={"Nome del file"}
					placeholder={"Nome del file"}
					size="small"
					// value={deployableFilename(formData.file ?? "")}
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
					helperText={errors.functionType}
				/>
			</Grid>
				
		</FormTemplate>
	);
};

export default CreateBpmn;