import React, { useContext, useRef, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { WorkflowResourceDto } from "../../../model/WorkflowResourceModel";
import { isValidDeployableFilename, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchCreateWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchCreateWorkflowResource";
import { Ctx } from "../../../DataContext";
import { CREATE_WR } from "../../../commons/constants";

export const CreateWR = () => {
	// const theme = useTheme();
	const { abortController } = useContext(Ctx);

	const { getFormOptions } = formOption();

	const initialValues: WorkflowResourceDto = {
		file: undefined,
		filename: "",
		resourceType: "",
	};

	const [formData, setFormData] = useState<WorkflowResourceDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);

	
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	function validateForm() {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? isValidDeployableFilename(formData.filename) ? "" : "nome del file non valido" : "Campo obbligatorio",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		console.log("validate ouput: ", Object.values(newErrors).every((error)=> !error), Object.values(newErrors));

		return Object.values(newErrors).every((error) => !error);
	};


	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};


	const handleSubmit = (e: React.FormEvent) => {
		
		if (validateForm()) {
			console.log("VALUES:", formData);

			const createWorkflowResource = new Promise((resolve) => {
				void fetchCreateWorkflowResource({ abortController, body: formData })()
					.then((response: any) => {
						if (response) {
							resolve({
								data: response,
								type: "SUCCESS"
							});
						} else {
							resolve({
								type: "ERROR"
							});
						}
					})
					.catch((err) => {
						console.log("ERROR", err);
					});
			});

			createWorkflowResource
				.then((res) => {
					console.log("CREATE WORKFLOW RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("CREATE WORKFLOW RESOURCE BPMN ERROR", err)
				);

		};
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_WR)}>
			
			<UploadField 
				titleField="File risorsa" 
				name={"file"}
				file={formData.file}
				clearFile={clearFile}
				error={errors.file}
				setFormData={setFormData}
				formData={formData}
			/>
			<Grid item xs={12} my={1}>
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
					helperText={errors.filename}
				/>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="resourceType"
					name="resourceType"
					select
					label={"Estensione del file"}
					placeholder={"Estensione del file"}
					size="small"
					value={formData.resourceType}
					onChange={handleChange}
					error={Boolean(errors.filename)}
					helperText={errors.filename}
				>
					<MenuItem value={"BPMN"}>BPMN</MenuItem>
					<MenuItem value={"DMN"}>DMN</MenuItem>
					<MenuItem value={"FORM"}>FORM</MenuItem>
				</TextField>
			</Grid>
		
		</FormTemplate>
	);
};

export default CreateWR;
