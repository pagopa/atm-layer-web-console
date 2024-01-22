import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { DeployBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";

type Props = {
	errors: any;
	formData: any;
	setFormData: any;
};

export const DeployBpmn = () => {
	// const theme = useTheme();

	const initialValues: DeployBpmnDto = {
		uuid: undefined,
		version: undefined,
	};

	const [formData, setFormData] = useState<DeployBpmnDto>(initialValues);
	const [errors, setErrors] = useState({ uuid: "", version: "" });
	const { getFormOptions } = formOption();

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid
				? isValidUUID(formData.uuid)
					? ""
					: "uuid non valido"
				: "Campo obbligatorio",
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
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Deploy")} >
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="uuid"
					name="uuid"
					label={"Identificatore Univoco"}
					placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
					size="small"
					value={formData.uuid}
					onChange={(e) => setFormData({ ...formData, uuid: e.target.value })}
					error={Boolean(errors.uuid)}
					helperText={errors.uuid}
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
		</FormTemplate>
	);
};

export default DeployBpmn;
