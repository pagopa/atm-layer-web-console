import React, { ChangeEvent, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UploadFileWithButton from "../components/UploadFileWithButton";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "./FormTemplate";

type Props = {
	errors:any ;
	formData: any; 
	setFormData: any; 
	
  };
export const NewBpmn = () => {
	const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: BpmnDto = {
		file: undefined,
		fileName: undefined,
		functionType: undefined,
	};
 
	const [formData, setFormData] = useState<BpmnDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
 
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
 
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
 
		if (validateForm()) {
			console.log("VALUES:", formData);
		}
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, file: e.target.value });
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	return (
		
	// <Box sx={inputGroupStyle} mt={4}>
				
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Create")} >	
						
			<Grid container item>
				<Typography variant="body1">File BPMN</Typography>
				<UploadFileWithButton
					name={"file"}
					file={formData.file}
					onChange={(e: ChangeEvent<HTMLInputElement>) => changeFile(e)}
					onClick={clearFile}
					error={errors.file}
				/>
			</Grid>
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="fileName"
					name="fileName"
					label={"Nome del file"}
					placeholder={"Nome del file"}
					size="small"
					value={formData.fileName}
					onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
					error={Boolean(errors.fileName)}
					helperText={errors.fileName}
				/>
			</Grid>
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Tipo di funzione"}
					placeholder={"Tipo di funzione"}
					size="small"
					value={formData.functionType}
					onChange={(e) => setFormData({ ...formData, functionType: e.target.value })}
					error={Boolean(errors.functionType)}
					helperText={errors.functionType}
				/>
			</Grid>
			
		</FormTemplate>
		// </Box>
		
	);
};

export default NewBpmn;
