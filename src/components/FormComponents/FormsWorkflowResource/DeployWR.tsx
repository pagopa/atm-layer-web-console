import React, { useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { WRDeployDto } from "../../../model/WorkflowResourceModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchDeployWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchDeployWorkflowResource";

export const DeployWR = () => {
	const { getFormOptions } = formOption();

	const initialValues: WRDeployDto = {
		uuid: ""
	};

	const [formData, setFormData] = useState<WRDeployDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const abortController = useRef(new AbortController());

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid === "" ? "Campo obbligatorio" : isValidUUID(formData.uuid) ? "" : "uuid non valido",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const deployWorkflowResource = new Promise((resolve) => {
				void fetchDeployWorkflowResource({ abortController, body: formData }, formData.uuid)()
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
					console.log("DEPLOY WORKFLOW RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("DEPLOY WORKFLOW RESOURCE BPMN ERROR", err)
				);
		};
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Deploy WR")}>
			
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
	
		</FormTemplate>
	);
};

export default DeployWR;
