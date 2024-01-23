import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";


export const UpdateWR = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: WRUpdateDto = {
		uuid: "",
		file: ""
	};

	const [formData, setFormData] = useState<WRUpdateDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid==="" ? "Campo obbligatorio" : isValidUUID(formData.uuid) ? "" : "uuid non valido", 
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
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Update WR")}>
			<Grid container >
				
				<UploadField 
					titleField="File della risorsa" 
					name={"file"}
					file={formData.file}
					changeFile={changeFile}
					clearFile={clearFile}
					error={errors.file}
				/>
				<Grid item xs={12} my={1}>
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
		</FormTemplate>
	);
};

export default UpdateWR;
