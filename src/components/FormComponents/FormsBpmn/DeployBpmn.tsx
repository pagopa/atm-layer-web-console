import { useContext, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { DeployBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchDeployBpmn from "../../../hook/fetch/Bpmn/fetchDeployBpmn";
import { Ctx } from "../../../DataContext";
import { DEPLOY_BPMN } from "../../../commons/constants";

export const DeployBpmn = () => {
	// const theme = useTheme();

	const initialValues: DeployBpmnDto = {
		uuid: undefined,
		version: undefined,
	};

	const [formData, setFormData] = useState<DeployBpmnDto>(initialValues);
	const [errors, setErrors] = useState({ uuid: "", version: "" });
	const { getFormOptions } = formOption();
	const { abortController } = useContext(Ctx);

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		if(e.target.name==="version"){
			setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });
		}else{
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};


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
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(DEPLOY_BPMN)} >
		
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="uuid"
					name="uuid"
					label={"ID processo"}
					placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
					size="small"
					value={formData.uuid}
					onChange={handleChange}
					error={Boolean(errors.uuid)}
					helperText={errors.uuid}
				/>
			</Grid>
			
			<Grid item xs={12} my={1}>

				<TextField
					fullWidth
					id="version"
					name="version"
					label={"Versione processo"}
					placeholder={""}
					type="number"
					size="small"
					value={formData.version}
					InputProps={{ inputProps: { min: 1 } }}
					onChange={handleChange}
					error={Boolean(errors.version)}
					helperText={errors.version}
				/>
			</Grid>
		
		</FormTemplate>
	);
};

export default DeployBpmn;
