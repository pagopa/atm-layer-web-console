import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { DeleteBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID } from "../../../utils/Commons";

export const DeleteBpmn = () => {
	const theme = useTheme();

	const initialValues: DeleteBpmnDto = {
		bpmnid: undefined,
		version: undefined,
	};

	const [formData, setFormData] = useState<DeleteBpmnDto>(initialValues);
	const [errors, setErrors] = useState({ bpmnid: "", version: "" });

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
			bpmnid: formData.bpmnid ? isValidUUID(formData.bpmnid) ? "" : "uuid non valido" : "Campo obbligatorio",
			version: formData.version ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
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
			width={"100vw"}
		>
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent title={"Eliminazione BPMN"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per Eliminare un BPMN
							</Typography>
						</Grid>
						<Grid container item my={1}>
							<TextField
								fullWidth
								id="bpmnid"
								name="bpmnid"
								label={"Identificatore Univoco Bpmn"}
								placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
								size="small"
								value={formData.bpmnid}
								onChange={(e) => setFormData({ ...formData, bpmnid: e.target.value })}
								error={Boolean(errors.bpmnid)}
								helperText={errors.bpmnid}
							/>
						</Grid>
						<Grid container item my={1}>
							<TextField
								fullWidth
								id="version"
								name="version"
								label={"Versione"}
								placeholder={"Versione"}
								type="number"
								size="small"
								value={formData.version}
								onChange={(e) => setFormData({ ...formData, version: parseInt(e.target.value, 10) })}
								error={Boolean(errors.version)}
								helperText={errors.version}
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

export default DeleteBpmn;
