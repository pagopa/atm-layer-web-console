import React, { useContext, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { WorkflowResourceDto } from "../../../model/WorkflowResourceModel";
import { handleSnackbar, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import fetchCreateWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchCreateWorkflowResource";
import { Ctx } from "../../../DataContext";
import { CREATE_WR } from "../../../commons/constants";
import checks from "../../../utils/checks";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";

export const CreateWR = () => {
	const { abortController } = useContext(Ctx);
	const { isValidDeployableFilename } = checks();

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


	const handleSubmit = async (e: React.FormEvent) => {
		
		if (validateForm()) {
			const postData = new FormData();
			if (formData.file && formData.filename && formData.resourceType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("resourceType", formData.resourceType);
			}
			try {
				const response = await fetchCreateWorkflowResource({ abortController, body: postData }) ();
				if (response?.success) {
					console.log("Response positive: ", response);
					handleSnackbar(true, setMessage, setSeverity, setTitle, setOpenSnackBar);
				} else {
					handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
				}
			 } catch (error) {
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
			
	};

	return (
		<FormTemplate setOpenSnackBar={setOpenSnackBar} handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_WR)}>
			
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
