import React, { useState, useRef } from "react";
import { Grid, TextField } from "@mui/material";
import { ResourcesUpdateDto } from "../../../model/ResourcesModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import fetchUpgradeResources from "../../../hook/fetch/Resources/fetchUpgradeResources";

type Props = {
	errors: any;
	formData: any;
	setFormData: any;
};

export const UpdateResources = () => {
	// const theme = useTheme();

	const { getFormOptions } = formOption();

	const initialValues: ResourcesUpdateDto = {
		uuid: "",
		file: ""
	};

	const [formData, setFormData] = useState<ResourcesUpdateDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const abortController = useRef(new AbortController());

	const validateForm = () => {
		const newErrors = {
			uuid: formData.uuid === "" ? "Campo obbligatorio" : isValidUUID(formData.uuid) ? "" : "uuid non valido",
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
			const createBpmn = new Promise((resolve) => {
				if (formData.uuid !== undefined) {
					void fetchUpgradeResources({ abortController, body: formData }, formData.uuid)()
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

			createBpmn
				.then((res) => {
					console.log("UPGRADE RESOURCE RESPONSE", res);
					return res;
				})
				.catch((err) =>
					console.log("UPGRADE RESOURCE ERROR", err)
				);
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions("Update Resources")}>
			
			<UploadField 
				titleField="File della risorsa" 
				name={"file"}
				file={formData.file}
				changeFile={changeFile}
				clearFile={clearFile}
				error={errors.file}
			/>
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

export default UpdateResources;
