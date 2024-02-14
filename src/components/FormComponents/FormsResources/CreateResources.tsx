import { Grid, MenuItem, TextField } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { ResourcesDto } from "../../../model/ResourcesModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchCreateResources from "../../../hook/fetch/Resources/fetchCreateResources";
import { Ctx } from "../../../DataContext";
import { CREATE_RES } from "../../../commons/constants";
import { resetErrors } from "../../../utils/Commons";
import checks from "../../../utils/checks";


export const CreateResources = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();
	const { isValidDeployableFilename } = checks();
	const initialValues: ResourcesDto = {
		file: undefined,
		filename: "",
		resourceType: "",
		path:"",
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);
    

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	
	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? isValidDeployableFilename(formData.filename) ? "" : "filename non valido" : "Campo obbligatorio",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
			path: formData.path ?? "",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const changeResourceType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, resourceType: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent) => {
		

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
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_RES)} >
			
			<UploadField 
				titleField="File della risorsa" 
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
					id="fileName"
					name="fileName"
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
					<MenuItem value={"HTML"}>HTML</MenuItem>
					<MenuItem value={"OTHER"}>OTHER</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField   
					fullWidth
					id="path"
					name="path"
					label={"Percorso nella cartella di destinazione"}
					placeholder={"(Opzionale)"}
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