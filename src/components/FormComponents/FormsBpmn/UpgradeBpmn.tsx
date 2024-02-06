import React, { useContext, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { UpgradeBpmnDto } from "../../../model/BpmnModel";
import { isValidUUID, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchUpgradeBpmn from "../../../hook/fetch/Bpmn/fetchUpgradeBpmn";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { UPGRADE_BPMN } from "../../../commons/constants";

export const UpgradeBpmn = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: UpgradeBpmnDto = {
		uuid: undefined,
		file: undefined,
		fileName: undefined,
		functionType: undefined,
	};

	const [formData, setFormData] = useState<UpgradeBpmnDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const { abortController } = useContext(Ctx);

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid ? isValidUUID(formData.uuid) ? "" : "uuid non valido" : "Campo obbligatorio",
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	const handleSubmit = (e: React.FormEvent) => {
		

		if (validateForm()) {
			const upgradeBpmn = new Promise((resolve) => {
				void fetchUpgradeBpmn({ abortController, body: formData })()
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

			upgradeBpmn
				.then((res) => {
					console.log("UPGRADE BPMN RESPONSE", res);
					return res;
				})
				.catch((err) => 
					console.log("UPGRADE BPMN ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(UPGRADE_BPMN)}>
			
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="uuid"
					name="uuid"
					label={"ID processo"}
					placeholder={"Identificatore Univoco"}
					size="small"
					value={formData.uuid}
					onChange={handleChange}
					error={Boolean(errors.uuid)}
					helperText={errors.uuid}
				/>
			</Grid>
			<UploadField 
				titleField="File BPMN del processo" 
				name={"file"}
				file={formData.file}
				changeFile={handleChange}
				clearFile={clearFile}
				error={errors.file}
			/>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="fileName"
					name="fileName"
					label={"Nome del file"}
					placeholder={"Nome del file"}
					size="small"
					value={formData.fileName}
					onChange={handleChange}
					error={Boolean(errors.fileName)}
					helperText={errors.fileName}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Funzionalità"}
					placeholder={"Funzionalità"}
					size="small"
					value={formData.functionType}
					onChange={handleChange}
					error={Boolean(errors.functionType)}
					helperText={errors.functionType}
				/>
			</Grid>
			
		</FormTemplate>
	);
};

export default UpgradeBpmn;