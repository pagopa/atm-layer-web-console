import React, { ChangeEvent, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import UploadFileWithButton from "../../BpmnPage/components/UploadFileWithButton";
import { isValidUUID } from "../../../utils/Commons";

export const UpdateWR = () => {
	const theme = useTheme();

	const initialValues: WRUpdateDto = {
		uuid: "",
		file: ""
	};

	const [formData, setFormData] = useState<WRUpdateDto>(initialValues);
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
			uuid: formData.uuid ? isValidUUID(formData.uuid) ? "" : "uuid non valido" : "Campo obbligatorio",
			file: formData.file ? "" : "Campo obbligatorio"
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
				<TitleComponent title={"Aggiornamento Workflow Resource"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per aggiornare una risorsa esistente
							</Typography>
						</Grid>
						<Grid container item>
							<Typography variant="body1">File della risorsa</Typography>
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
								id="uuid"
								name="uuid"
								label={"Identificativo unico del file"}
								placeholder={"Identificativo unico"}
								size="small"
								value={formData.uuid}
								onChange={(e) => setFormData({ ...formData, uuid: e.target.value })}
								error={Boolean(errors.uuid)}
								helperText={errors.uuid}
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

export default UpdateWR;
