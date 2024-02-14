import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { WRUpdateDto } from "../../../model/WorkflowResourceModel";
import { resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchUpdateWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchUpdateWorkflowResource";
import { Ctx } from "../../../DataContext";
import { UPDATE_WR } from "../../../commons/constants";
import checks from "../../../utils/checks";

export const UpdateWR = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();
	const { regexTestField } = checks();

	const initialValues: WRUpdateDto = {
		uuid: "",
		file: undefined
	};

	const [formData, setFormData] = useState<WRUpdateDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);


	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid==="" ? "Campo obbligatorio" : regexTestField(formData.uuid, "uuid") ? "" : "uuid non valido", 
			file: formData.file ? "" : "Campo obbligatorio"
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const handleSubmit = (e: React.FormEvent) => {
		

		if (validateForm()) {
			const deployWorkflowResource = new Promise((resolve) => {
				void fetchUpdateWorkflowResource({ abortController, body: formData }, formData.uuid)()
					.then((response: any) => {
						if (response) {
							resolve({
								data: response,
								type: "SUCCESS"
							});
						} else {
							resolve({
								type: "ERROR"
							});
						}
					})
					.catch((err) => {
						console.log("ERROR", err);
					});
			});

			deployWorkflowResource
				.then((res) => {
					console.log("UPDATE WORKFLOW RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("UPDATE WORKFLOW RESOURCE BPMN ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(UPDATE_WR)}>
			<UploadField 
				titleField="File della risorsa" 
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
					id="uuid"
					name="uuid"
					label={"ID file"}
					placeholder={"ID file"}
					size="small"
					value={formData.uuid}
					onChange={handleChange}
					error={Boolean(errors.uuid)}
					helperText={errors.uuid}
				/>
			</Grid>
		</FormTemplate>
	);
};

export default UpdateWR;
