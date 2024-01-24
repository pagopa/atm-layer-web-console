import { useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { DeployBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";

export const DeployBpmn = () => {
	// const theme = useTheme();

	const initialValues: DeployBpmnDto = {
		uuid: undefined,
		version: undefined,
	};

	const [formData, setFormData] = useState<DeployBpmnDto>(initialValues);
	const [errors, setErrors] = useState({ uuid: "", version: "" });
	const { getFormOptions } = formOption();
	const abortController = useRef(new AbortController());

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
			const deployBpmn = new Promise((resolve) => {

				if (formData.uuid && formData.version !== undefined) {
					void fetchDeployBpmn({ abortController, body: formData }, formData.uuid, formData.version)()
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

			deployBpmn
				.then((res) => {
					console.log("DEPLOY BPMN RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("DEPLOY BPMN ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Deploy BPMN")} >
		
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="uuid"
					name="uuid"
					label={"Identificatore Univoco"}
					placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
					size="small"
					value={formData.uuid}
					onChange={(e) => setFormData({ ...formData, uuid: e.target.value })}
					error={Boolean(errors.uuid)}
					helperText={errors.uuid}
				/>
			</Grid>
			
			<Grid item xs={12} my={1}>

				<TextField
					fullWidth
					id="version"
					name="version"
					label={"Versione"}
					placeholder={""}
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
