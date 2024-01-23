import React, { useRef, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { WorkflowResourceDto } from "../../../model/WorkflowResourceModel";
import { isValidDeployableFilename } from "../../../utils/Commons";
import fetchCreate from "../../../hook/fetch/WorkflowResource/fetchCreate";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";


export const CreateWR = () => {
	// const theme = useTheme();
	const abortController = useRef(new AbortController());

	const { getFormOptions } = formOption();

	const initialValues: WorkflowResourceDto = {
		file: "",
		filename: "",
		resourceType: "",
	};

	const [formData, setFormData] = useState<WorkflowResourceDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);


	function validateForm() {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename === "" ? "Campo obbligatorio" : isValidDeployableFilename(formData.filename) ? "" : "nome del file non valido",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		console.log("validate ouput: ", Object.values(newErrors).every((error)=> !error), Object.values(newErrors));

		return Object.values(newErrors).every((error) => !error);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, file: e.target.value });
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	const changeResourceType = (e: React.ChangeEvent<HTMLInputElement>) => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		setFormData({ ...formData, resourceType: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			console.log("VALUES:", formData);

			const created = new Promise((resolve) =>{
				void fetchCreate({ abortController, body:formData })().then((dataObj:any) => {
					if (dataObj) {
						resolve({
							data: dataObj,
							type: "SUCCES",
						});
					} else {resolve({ type: "error" });} // procedo comunque, altrimenti avrei lanciato reject
					console.log("Auth res",dataObj);
				});
			});

			created.then(({ data}:any) => {
				console.log("Auth res",data);
				return data;
			})	.catch((e) => e);

		};
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Create WR")}>
			
			<UploadField 
				titleField="File BPMN" 
				name={"file"}
				file={formData.file}
				changeFile={changeFile}
				clearFile={clearFile}
				error={errors.file}
			/>
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="filename"
					name="filename"
					label={"Nome del file senza estensione"}
					placeholder={"Nome del file senza estensione"}
					size="small"
					value={formData.filename}
					onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
					error={Boolean(errors.filename)}
					helperText={errors.filename}
				/>
			</Grid>
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="resourceType"
					name="resourceType"
					select
					label={"Estensione del file"}
					placeholder={"Estensione del file"}
					size="small"
					value={formData.resourceType}
					onChange={changeResourceType}
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
