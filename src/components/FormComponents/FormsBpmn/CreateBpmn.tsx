import React, {useContext, useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { BpmnDto } from "../../../model/BpmnModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import fetchCreateBpmn from "../../../hook/fetch/Bpmn/fetchCreateBpmn";
import UploadField from "../UploadField";
import { getAllBpmn } from "../../../services/AtmlLayerServices";
import { Ctx } from "../../../DataContext";
import { CREATE_BPMN } from "../../../commons/constants";
import { resetErrors } from "../../../utils/Commons";

export const CreateBpmn = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: BpmnDto = {
		file: undefined,
		fileName: undefined,
		functionType: undefined,
	};

	const [formData, setFormData] = useState<BpmnDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const { abortController } = useContext(Ctx);

	// useEffect(() => {
	// 	getAllBpmn(1, 10)
	// 		.then((res) => {
	// 			console.log("GET ALL BPMN RESPONSE", res);
	// 			return res;
	// 		})
	// 		.catch((err) => 
	// 			console.log("GET ALL BPMN ERROR", err)
	// 		);
	// }, []);3

	
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};
		
		setErrors(newErrors);
		
		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const handleSubmit = (e: React.FormEvent) => {

		if (validateForm()) {
			console.log("VALUES:", formData);

			const createBpmn = new Promise((resolve) => {
				void fetchCreateBpmn({ abortController, body: formData })()
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

			createBpmn
				.then((res) => {
					console.log("CREATE BPMN RESPONSE", res);
					return res;
				})
				.catch((err) => 
					console.log("CREATE BPMN ERROR", err)
				);
		}
	};

	
	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(CREATE_BPMN)}>
			<UploadField 
				titleField="File BPMN" 
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
					helperText={errors.fileName} />
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Tipo di funzione"}
					placeholder={"Tipo di funzione"}
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

export default CreateBpmn;