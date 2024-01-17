import React, { ChangeEvent, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import UploadFileWithButton from "../components/UploadFileWithButton";
import { BpmnDto } from "../../../model/BpmnModel";

export const NewBpmn = () => {
	const theme = useTheme();

	const initialValues: BpmnDto = {
		file: "",
		fileName: "",
		functionType: "",
	};

	const [formData, setFormData] = useState<BpmnDto>(initialValues);
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
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, file: e.target.value });
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
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
				<TitleComponent title={"Creazione BPMN"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per creare un nuovo BPMN
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

export default NewBpmn;
