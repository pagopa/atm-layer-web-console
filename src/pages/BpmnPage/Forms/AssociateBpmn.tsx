/* eslint-disable indent */
import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { AssociateBpmnBodyDto, AssociateBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID } from "../../../utils/Commons";

export const AssociateBpmn = () => {
	const theme = useTheme();

	const initialValues: AssociateBpmnDto = {
		acquirerId: undefined,
		functionType: undefined,
		body: {
            defaultTemplateId: undefined,
			defaultTemplateVersion: undefined
        }
	};

	const [formData, setFormData] = useState<AssociateBpmnDto>(initialValues);
	const [errors, setErrors] = useState({
        acquirerId: "",
        functionType: "",
        defaultTemplateId: "",
        defaultTemplateVersion: ""
    });

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
			acquirerId: formData.acquirerId ? isValidUUID(formData.acquirerId) ? "" : "uuid non valido" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
            defaultTemplateId: formData.body?.defaultTemplateId ? isValidUUID(formData.body?.defaultTemplateId) ? "" : "uuid non valido" : "Campo obbligatorio",
            defaultTemplateVersion: formData.body?.defaultTemplateVersion ? "" : "Campo obbligatorio"
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
				<TitleComponent title={"Associa BPMN"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per Associare un BPMN
							</Typography>
						</Grid>
						<Grid container item my={1}>
							<TextField
								fullWidth
								id="acquirerId"
								name="acquirerId"
								label={"Codice identificativo banca"}
								placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
								size="small"
								value={formData.acquirerId}
								onChange={(e) => setFormData({ ...formData, acquirerId: e.target.value })}
								error={Boolean(errors.acquirerId)}
								helperText={errors.acquirerId}
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
                        <Grid container item my={1}>
							<TextField
								fullWidth
								id="functionType"
								name="functionType"
								label={"Identificatore univoco Bmpn di default"}
								placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
								size="small"
								value={formData.body?.defaultTemplateId}
								onChange={(e) => setFormData({ ...formData, body: { ...formData.body, defaultTemplateId: e.target.value} })}
								error={Boolean(errors.defaultTemplateId)}
								helperText={errors.defaultTemplateId}
							/>
						</Grid>
                        <Grid container item my={1}>
                        <TextField
								fullWidth
								id="functionType"
								name="functionType"
								label={"Versione Bmpn di default"}
								placeholder={"Versione Bmpn di default"}
								size="small"
                                type="number"
								value={formData.body?.defaultTemplateVersion}
								onChange={(e) => setFormData({ ...formData, body: { ...formData.body, defaultTemplateVersion: parseInt(e.target.value, 10)} })}
								error={Boolean(errors.defaultTemplateVersion)}
								helperText={errors.defaultTemplateVersion}
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

export default AssociateBpmn;
