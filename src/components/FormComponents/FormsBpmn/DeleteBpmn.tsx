import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { DeleteBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID, resetErrors } from "../../../utils/Commons";
import FormTemplate from "../template/FormTemplate";
import formOption from "../../../hook/formOption";
import fetchDeleteBpmn from "../../../hook/fetch/Bpmn/fetchDeleteBpmn";
import { Ctx } from "../../../DataContext";
import { DELETE_BPMN } from "../../../commons/constants";

export const DeleteBpmn = () => {
	// const theme = useTheme();

	const initialValues: DeleteBpmnDto = {
		bpmnid: undefined,
		version: undefined,
	};

	const { getFormOptions } = formOption();

	const [formData, setFormData] = useState<DeleteBpmnDto>(initialValues);
	const [errors, setErrors] = useState({ bpmnid: "", version: "" });
	const { abortController } = useContext(Ctx);

	const validateForm = () => {
		const newErrors = {
			bpmnid: formData.bpmnid ? isValidUUID(formData.bpmnid) ? "" : "uuid non valido" : "Campo obbligatorio",
			version: formData.version ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		if(e.target.name==="version"){
			setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });
		}else{
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		

		if (validateForm()) {
			const deleteBpmn = new Promise((resolve) => {
				if (formData.bpmnid && formData.version !== undefined) {
					void fetchDeleteBpmn({ abortController, body: formData }, formData.bpmnid, formData.version)()
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
				}
			});

			deleteBpmn
				.then((res) => {
					console.log("DELETE BPMN RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("DELETE BPMN ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(DELETE_BPMN)}>
			
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="bpmnid"
					name="bpmnid"
					label={"Identificatore Univoco Bpmn"}
					placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
					size="small"
					value={formData.bpmnid}
					onChange={handleChange}
					error={Boolean(errors.bpmnid)}
					helperText={errors.bpmnid}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="version"
					name="version"
					label={"Versione"}
					placeholder={""}
					type="number"
					size="small"
					value={formData.version}
					onChange={handleChange}
					error={Boolean(errors.version)}
					helperText={errors.version}
				/>
			</Grid>
	
		</FormTemplate>
	);
};

export default DeleteBpmn;
