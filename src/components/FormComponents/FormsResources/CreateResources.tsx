import { Grid, MenuItem, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { ResourcesDto } from "../../../model/ResourcesModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchCreateResources from "../../../hook/fetch/Resources/fetchCreateResources";


export const CreateResources = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: ResourcesDto = {
		file: "",
		filename: "",
		resourceType: "",
		path:"",
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const abortController = useRef(new AbortController());
    
	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? "" : "Campo obbligatorio",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
			path: formData.path ?? "",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, file: e.target.value });
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	const changeResourceType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, resourceType: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const createBpmn = new Promise((resolve) => {
				void fetchCreateResources({ abortController, body: formData })()
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

			createBpmn
				.then((res) => {
					console.log("CREATE RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) => 
					console.log("CREATE RESOURCE ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Create Resources")} >
			
			<UploadField 
				titleField="Resource File" 
				name={"file"}
				file={formData.file}
				changeFile={changeFile}
				clearFile={clearFile}
				error={errors.file}
			/>
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="fileName"
					name="fileName"
					label={"Nome del file senza estensione"}
					placeholder={"Nome del file senza estensione"}
					size="small"
					value={formData.filename}
					onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
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
					onChange={changeResourceType}
					error={Boolean(errors.filename)}
					helperText={errors.filename}
				>
					<MenuItem value={"HTML"}>HTML</MenuItem>
                            	<MenuItem value={"OTHER"}>OTHER</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField   fullWidth
					id="path"
					name="path"
					label={"Percorso (Opzionale)"}
					placeholder={"Percorso (Opzionale)"}
					size="small"
					value={formData.path}
					error={Boolean(errors.path)}
					helperText={errors.path}>
				</TextField>
			</Grid>
			
		</FormTemplate>
	);
};

export default CreateResources;