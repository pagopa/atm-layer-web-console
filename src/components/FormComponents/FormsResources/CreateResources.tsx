import { FormHelperText, Grid, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import { ResourceDto, ResourcesDto } from "../../../model/ResourcesModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { ALERT_ERROR, ALERT_INFO, ALERT_SUCCESS, CREATE_RES, MAX_LENGHT_LARGE } from "../../../commons/constants";
import { handleSnackbar, removeArrayItem, resetErrors } from "../../Commons/Commons";
import checks from "../../../utils/checks";
import { RESOURCES_CREATE, RESOURCES_CREATE_MULTIPLE } from "../../../commons/endpoints";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";

export const CreateResources = () => {
	const [loadingButton, setLoadingButton] = useState(false);
	const { getFormOptions } = formOption();
	const { isValidResourcesFilename, isValidPath } = checks();
	const initialValuesMultiple: ResourcesDto = {
		fileArray: [] as Array<File>,
		filenames: [] as Array<string>,
		resourceType: "",
		path: "",
		description: ""
	};

	const initialValues: ResourceDto = {
		file: undefined,
		filename: "",
		resourceType: "",
		path: "",
		description: ""
	};

	const [multiple, setMultiple] = useState(false);

	const [formData, setFormData] =  useState<any>(multiple? initialValuesMultiple : initialValues);
	const [errors, setErrors] = useState<any>(multiple? {} : initialValues);

	

	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const optionFormMenu = [{ key: "HTML", value: "HTML" }, { key: "OTHER", value: "OTHER" }];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		// eslint-disable-next-line functional/immutable-data
		const fileExtension = formData.file?.name.split(".").pop()?.toLowerCase();
		// eslint-disable-next-line functional/immutable-data
		const fileExtensions = formData.filenames?.map((name: string) => name.split(".").pop()?.toLowerCase());
		const newErrors = {
			file: formData.file || multiple ? "" : "Campo obbligatorio",
			filename: multiple? "" : isValidResourcesFilename(formData.filename) ?
			// eslint-disable-next-line functional/immutable-data
				(fileExtension === formData.filename.split(".").pop()?.toLowerCase()) ?
					"" :
					"L'estensione del file non corrisponde con quello caricato"
				: "Il nome del file deve essere nel formato nome.estensione; gli unici caratteri speciali ammessi sono _ e -",
			fileArray: formData.fileArray?.length > 0 ||  !multiple ? "" : "Campo obbligatorio",
			filenames: !multiple? "" : formData.filenames?.map((name: string) =>
				isValidResourcesFilename(name)
				 ? ""
					: "Il nome del file deve essere nel formato nome.estensione; gli unici caratteri speciali ammessi sono _ e -"),
			resourceType: formData.resourceType ?
				(formData.resourceType  === "HTML" && ( fileExtensions?.every((el: string) => el === "html") || fileExtension === "html")) || 
		(formData.resourceType  === "OTHER" && ((!multiple && fileExtension !== "html") || (multiple && !fileExtensions?.includes("html"))) ) ?
					""
					: "L'estensione del file non corrisponde con quella selezionata"
				: "Campo obbligatorio",
			path: formData.path
				? isValidPath(formData.path)
					? ""
					: "La stringa non deve iniziare, né finire con / e non può contenere caratteri speciali; va indicato solo il percorso e non il nome del file"
				: ""
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) =>
			Array.isArray(error) ? error.every(e => !e) : !error
		);
	};



	const clearSingleFile = (e:React.MouseEvent<HTMLElement>) => {
		if (e.currentTarget.dataset.key){
			const index: number = +e.currentTarget.dataset.key;
			const updatedFileArray = removeArrayItem(index,formData?.fileArray);
			const updatedFileNames = removeArrayItem(index,formData?.filenames);
			setFormData({ ...formData, fileArray:updatedFileArray, filenames: updatedFileNames });
			setErrors({...errors, fileArray: "", filenames: []});
		}
	};

	const clearAllFiles = () => {
		setFormData({ ...formData, fileArray:[], filenames: [] });
		setErrors({...errors, fileArray: "", filenames: []});
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined, filename: "" });
	};

	const resetForm = (multiple:boolean) => {
		setFormData(multiple? initialValuesMultiple : initialValues);
		setErrors(multiple? {} : initialValues);
	};

	const customAlert = (message:string) => {
		handleSnackbar(ALERT_INFO, setMessage, setSeverity, setTitle, setOpenSnackBar, message);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			const postData = new FormData();
			if (!multiple && formData.file && formData.filename){
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
			} 
			else if ( multiple && formData.fileArray && formData.filenames){
				formData.fileArray.forEach((file: Blob) => postData.append("file", file));
				formData.filenames.forEach((name: string) => postData.append("filename", name.replace(/\s/g, "")));
			}
			postData.append("resourceType", formData.resourceType);
			postData.append("path", formData.path ?? "");
			setLoadingButton(true);

			try {
				const createEndpoint = multiple? RESOURCES_CREATE_MULTIPLE : RESOURCES_CREATE;
				const response = await fetchRequest({ urlEndpoint: createEndpoint, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success? ALERT_SUCCESS : ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);

			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(ALERT_ERROR, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}

		}
	};

	

	return (
		<FormTemplate
			setOpenSnackBar={setOpenSnackBar}
			handleSubmit={handleSubmit}
			getFormOptions={getFormOptions(CREATE_RES)}
			openSnackBar={openSnackBar}
			severity={severity}
			message={message}
			title={title}
			loadingButton={loadingButton}
		>
			<Stack display="flex" flexDirection="row" position="relative" sx={{marginLeft:"auto", alignItems: "center"}}>
				<Typography >Caricamento multiplo</Typography>
				<Switch
					checked={multiple}
					onChange={() => {
						setMultiple(!multiple);
						resetForm(!multiple);
						setOpenSnackBar(false);
					}}
					name="branchIdSwitch"
				/>
			</Stack>
			{multiple ? (
				<React.Fragment>
					<UploadField
						titleField="File della risorsa statica"
						name={"file"}
						files={formData.fileArray}
						clearFile={clearSingleFile}
						clearMultipleFile={clearAllFiles}
						error={errors.fileArray}
						setFormData={setFormData}
						formData={formData}
						keepExtension={true}
						multiple={true}
						setErrors={setErrors}
						customAlert={customAlert}
					/>
					{errors.filenames && errors.filenames.some((error: any) => error) && (
						<Box mx={"10px"} mb={1}>
							<FormHelperText error>
								{errors.filenames.find((error: any) => error)}
							</FormHelperText>
						</Box>
					)}
					
				</React.Fragment>
			)
				:
				(
					<React.Fragment>
						<UploadField
							titleField="File della risorsa statica"
							name={"file"}
							file={formData.file}
							clearFile={clearFile}
							error={errors.file}
							setFormData={setFormData}
							formData={formData}
							keepExtension={true}
							setErrors={setErrors}
						/>
						<Grid item xs={12} my={1}>
							<TextField
								fullWidth
								id="filename"
								name="filename"
								label={"Nome del file con Estensione"}
								placeholder={"Esempio_file.txt"}
								size="small"
								value={formData.filename}
								onChange={handleChange}
								error={Boolean(errors.filename)}
								helperText={errors.filename}
								inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
							/>
						</Grid>
					</React.Fragment>
				)
			}
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="resourceType"
					name="resourceType"
					select
					label={"Estensione del file"}
					placeholder={"HTML"}
					size="small"
					value={formData.resourceType}
					onChange={handleChange}
					error={Boolean(errors.resourceType)}
					helperText={errors.resourceType}
					inputProps={{ "data-testid": "resource-type-test" }}
				>
					{optionFormMenu?.map((el) => (
						<MenuItem key={el.key} value={el.value}>{el.value}</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="path"
					name="path"
					label={"Percorso nella cartella di destinazione (Opzionale)"}
					placeholder={"esempio/percorso"}
					size="small"
					value={formData.path}
					onChange={handleChange}
					error={Boolean(errors.path)}
					helperText={errors.path}
					inputProps={{ "data-testid": "path-test" }}
				>
				</TextField>
			</Grid>
		</FormTemplate>
	);
};

export default CreateResources;
