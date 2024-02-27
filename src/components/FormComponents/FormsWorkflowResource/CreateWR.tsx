import React, { useContext, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { WorkflowResourceDto } from "../../../model/WorkflowResourceModel";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import formOption from "../../../hook/formOption";
import { Ctx } from "../../../DataContext";
import { CREATE_WR, MAX_LENGHT_LARGE } from "../../../commons/constants";
import checks from "../../../utils/checks";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import { CREATE_WR_API } from "../../../commons/endpoints";

export const CreateWR = () => {
	const { abortController } = useContext(Ctx);
	const { isValidDeployableFilename } = checks();
	const [loadingButton, setLoadingButton] = useState(false);

	const { getFormOptions } = formOption();

	const initialValues: WorkflowResourceDto = {
		file: undefined,
		filename: "",
		resourceType: "",
	};

	const [formData, setFormData] = useState<WorkflowResourceDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	
	const optionFormMenu=[{key:"BPMN", value:"BPMN", },{key:"DMN", value:"DMN"},{key:"FORM", value:"FORM"}];
	
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
		return Object.values(newErrors).every((error) => !error);
	};


	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};


	const handleSubmit = async (e: React.FormEvent) => {
		
		if (validateForm()) {
			const postData = new FormData();
			if (formData.file && formData.filename && formData.resourceType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("resourceType", formData.resourceType);
			}
			setLoadingButton(true);
			try {
				const response = await fetchRequest({ urlEndpoint: CREATE_WR_API, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				
			 } catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
			
	};

	return (
		<FormTemplate 
			setOpenSnackBar={setOpenSnackBar} 
			handleSubmit={handleSubmit} 
			getFormOptions={getFormOptions(CREATE_WR)}
			openSnackBar={openSnackBar} 
			severity={severity} 
			message={message} 
			title={title}
			loadingButton={loadingButton}
		>
			
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
					inputProps={ MAX_LENGHT_LARGE }
					fullWidth
					id="filename"
					name="filename"
					label={"Nome del file"}
					placeholder={"Esempio_Risorsa"}
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
					placeholder={"DMN"}
					size="small"
					value={formData.resourceType}
					onChange={handleChange}
					error={Boolean(errors.filename)}
					helperText={errors.filename}
				>
					{optionFormMenu?.map((el)=>(
						<MenuItem key={el.key} value={el.value}>{el.value}</MenuItem>
					)
					)}
				</TextField>
			</Grid>
		
		</FormTemplate>
	);
};


export default CreateWR;
