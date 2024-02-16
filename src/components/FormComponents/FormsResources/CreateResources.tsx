import { Grid, MenuItem, TextField } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { ResourcesDto } from "../../../model/ResourcesModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchCreateResources from "../../../hook/fetch/Resources/fetchCreateResources";
import { Ctx } from "../../../DataContext";
import { CREATE_RES } from "../../../commons/constants";
import { handleSnackbar, resetErrors } from "../../../utils/Commons";
import checks from "../../../utils/checks";


export const CreateResources = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();
	const { isValidResourcesFilename } = checks();
	const initialValues: ResourcesDto = {
		file: undefined,
		filename: "",
		resourceType: "",
		path:"",
		description:""
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
    

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	
	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? isValidResourcesFilename(formData.filename) ? "" : "filename non valido" : "Campo obbligatorio",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio"
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = new FormData();
			if (formData.file && formData.filename && formData.resourceType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("resourceType", formData.resourceType);
			}
			
			try {
				console.log("append", postData);
				const response = await fetchCreateResources({ abortController, body: postData })();
				if (response?.success) {
					console.log("Response positive: ", response);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} else {
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar, response.valuesObj.message);
				}
			} catch (error) {
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}

		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_RES)} >
			
			<UploadField 
				titleField="File della risorsa statica" 
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
					<MenuItem value={"HTML"}>HTML</MenuItem>
					<MenuItem value={"OTHER"}>OTHER</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField   
					fullWidth
					id="path"
					name="path"
					label={"Percorso nella cartella di destinazione (Opzionale)"}
					placeholder={"Percorso nella cartella di destinazione (Opzionale)"}
					size="small"
					value={formData.path}
					onChange={handleChange}
					error={Boolean(errors.path)}
					helperText={errors.path}>
				</TextField>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField   
					fullWidth
					id="description"
					name="description"
					label={"Descrizione (Opzionale)"}
					placeholder={"Descrizione (Opzionale)"}
					size="small"
					value={formData.description}
					onChange={handleChange}
					error={Boolean(errors.description)}
					helperText={errors.description}>
				</TextField>
			</Grid>
			
		</FormTemplate>
	);
};

export default CreateResources;