import React, { ChangeEvent, useState } from "react";
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { WorkflowResourceDto } from "../../../model/WorkflowResourceModel";
import UploadFileWithButton from "../../BpmnPage/components/UploadFileWithButton";
import { isValidDeployableFilename } from "../../../utils/Commons";

export const CreateWR = () => {
	const theme = useTheme();

	const initialValues: WorkflowResourceDto = {
		file: "",
		fileName: "",
		resourceType: "",
	};

	const [formData, setFormData] = useState<WorkflowResourceDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);

	const inputGroupStyle = {
		borderRadius: 1,
		border: 1,
		borderColor: theme.palette.divider,
		p: 3,
		mb: 3,
		width: "50%",
	};

	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName==="" ? "Campo obbligatorio" : isValidDeployableFilename(formData.fileName) ? "" : "nome del file non valido",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
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

	const changeResourceType = (e: SelectChangeEvent) => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		setFormData({...formData, resourceType: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			console.log("VALUES:", formData);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width={"85vw"}
		>
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent title={"Creazione Workflow Resource"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per creare una nuova Workflow Resource
							</Typography>
						</Grid>
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
								label={"Nome del file senza estensione"}
								placeholder={"Nome del file senza estensione"}
								size="small"
								value={formData.fileName}
								onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
								error={Boolean(errors.fileName)}
								helperText={errors.fileName}
							/>
						</Grid>
						<Grid container item my={1}>
                            	<Select
                            		fullWidth
                            		id="resourceType"
								    name="resourceType"
                            		label="Estensione del file"
                            		size="small"
                            		value={formData.resourceType}
                            		onChange={changeResourceType}
								    error={Boolean(errors.resourceType)}
                            	>
                            		<MenuItem value={"BPMN"}>BPMN</MenuItem>
                            		<MenuItem value={"DMN"}>DMN</MenuItem>
                            		<MenuItem value={"FORM"}>FORM</MenuItem>
                            	</Select>

						</Grid>
					</Grid>
					<Box display="flex" justifyContent="flex-end" mt={2}>
						<Button variant="contained" type="submit">
                            Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default CreateWR;
