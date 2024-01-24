import React, { useContext, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { WRRollbackDto } from "../../../model/WorkflowResourceModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchRollbackWorkflowResource from "../../../hook/fetch/WorkflowResource/fetchRollbackWorkflowResource";
import { Ctx } from "../../../DataContext";

type Props = {
	errors: any;
	formData: any;
	setFormData: any;
};

export const RollbackWR = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: WRRollbackDto = {
		uuid: ""
	};

	const [formData, setFormData] = useState<WRRollbackDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const { abortController } = useContext(Ctx);

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
				void fetchRollbackWorkflowResource({ abortController, body: formData }, formData.uuid)()
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
					console.log("ROLLBACK WORKFLOW RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("ROLLBACK WORKFLOW RESOURCE BPMN ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Rollback WR")}>
			
			<Grid xs={12} item my={1}>
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

export default RollbackWR;
