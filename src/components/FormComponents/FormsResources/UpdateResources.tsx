import React, { ChangeEvent, useRef, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { ResourcesUpdateDto } from "../../../model/ResourcesModel";
import { isValidUUID } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import UploadFileWithButton from "../../UploadFileComponents/UploadFileWithButton";
import FormTemplate from "../template/FormTemplate";
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
			<Grid container item>
				<Grid container item my={1}>
					<Typography variant="body1">File della risorsa</Typography>
					<UploadFileWithButton
						name={"file"}
						file={formData.file}
						onChange={(e: ChangeEvent<HTMLInputElement>) => changeFile(e)}
						onClick={clearFile}
						error={errors.file}
					/>
				</Grid>
				<Grid container item my={1}>
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

export default UpdateResources;
