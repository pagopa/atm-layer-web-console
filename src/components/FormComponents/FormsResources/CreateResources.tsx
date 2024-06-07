import { FormHelperText, Grid, MenuItem, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import { ResourceDto, ResourcesDto } from "../../../model/ResourcesModel";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import UploadField from "../UploadField";
import { Ctx } from "../../../DataContext";
import { CREATE_RES, MAX_LENGHT_LARGE } from "../../../commons/constants";
import { handleSnackbar, resetErrors } from "../../Commons/Commons";
import checks from "../../../utils/checks";
import { RESOURCES_CREATE } from "../../../commons/endpoints";
import { fetchRequest } from "../../../hook/fetch/fetchRequest";
import formatValues from "../../../utils/formatValues";

export const CreateResources = () => {
	const [loadingButton, setLoadingButton] = useState(false);
	const { getFormOptions } = formOption();
	const { isValidResourcesFilename, isValidPath } = checks();
	const { extractExtensionFromFileName } = formatValues();
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

	const [formDataMultiple, setFormDataMultiple] = useState<ResourcesDto>(initialValuesMultiple);
	const [errorsMultiple, setErrorsMultiple] = useState<any>({});

	const [formData, setFormData] = useState<ResourceDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);

	const [multiple, setMultiple] = useState(false);

	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const optionFormMenu = [{ key: "HTML", value: "HTML" }, { key: "OTHER", value: "OTHER" }];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(multiple) {
			resetErrors(errorsMultiple, setErrorsMultiple, e.target.name);
			setFormDataMultiple({ ...formDataMultiple, [e.target.name]: e.target.value });
		}
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateFormMultiple = () => {
	
		if(formDataMultiple.fileArray && formDataMultiple.filenames) {
			// eslint-disable-next-line functional/immutable-data
			const fileExtensions = formDataMultiple.filenames.map(name => name.split(".").pop()?.toLowerCase());
			const newErrors = {
				fileArray: formDataMultiple.fileArray.length > 0 ? "" : "Campo obbligatorio",
				filenames: formDataMultiple.filenames.map(name =>
					isValidResourcesFilename(name)
						? ""
						: "Il nome del file deve essere nel formato nome.estensione; gli unici caratteri speciali ammessi sono _ e -"
				),
				resourceType: formDataMultiple.resourceType
					? formDataMultiple.resourceType === "HTML" && fileExtensions.every(el => el === "html")
						|| formDataMultiple.resourceType === "OTHER" && !fileExtensions.includes("html")
						? ""
						: "L'estensione del file non corrisponde con quella selezionata"
					: "Campo obbligatorio",
				path: formDataMultiple.path
					? isValidPath(formDataMultiple.path)
						? ""
						: "La stringa non deve iniziare, né finire con / e non può contenere caratteri speciali; va indicato solo il percorso e non il nome del file"
					: ""
			};
	
			setErrorsMultiple(newErrors);
	
			console.log("Errors:", newErrors);
	
			return Object.values(newErrors).every((error) =>
				Array.isArray(error) ? error.every(e => !e) : !error
			);
		}
	};

	const validateForm = () => {

		if(formData.file) {
			// eslint-disable-next-line functional/immutable-data
			const fileExtension = formData.file?.name.split(".").pop()?.toLowerCase();

			const newErrors = {
				file: formData.file ? "" : "Campo obbligatorio",
				filename:
				isValidResourcesFilename(formData.filename) ?
					// eslint-disable-next-line functional/immutable-data
					fileExtension && fileExtension === formData.filename.split(".").pop()?.toLowerCase() ?
						"" :
						"L'estensione del file non corrisponde con quello caricato"
					: "Campo obbligatorio",
				resourceType: formData.resourceType ?
					formData.resourceType  === "HTML" && fileExtension && fileExtension === "html" || 
				formData.resourceType  === "OTHER" && fileExtension && fileExtension !== "html" ?
						""
						: "L'estensione del file non corrisponde con quella selezionata"
					: "Campo obbligatorio"
			};

			setErrors(newErrors);

			return Object.values(newErrors).every((error) => !error);
		}
	};

	
			
	function removeArrayItem(index:number, arr?:Array<any>) {
		if (arr){
			// eslint-disable-next-line functional/immutable-data
			arr.splice(index,1);
			return arr;
		}
	}

	const clearSingleFile = (e:React.MouseEvent<HTMLElement>) => {
		// console.log("indice del file cliccato: ",e.currentTarget.dataset.testid);
		if (e.currentTarget.dataset.testid){
			const index: number = +e.currentTarget.dataset.testid;
			const updatedFileArray = removeArrayItem(index,formDataMultiple?.fileArray);
			const updatedFileNames = removeArrayItem(index,formDataMultiple?.filenames);
			setFormDataMultiple({ ...formDataMultiple, fileArray:updatedFileArray, filenames: updatedFileNames });
			setErrorsMultiple({...errorsMultiple, fileArray: "", filenames: []});
		}
		
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined });
	};

	const resetForm = () => {
		if (multiple) {
			setFormDataMultiple(initialValuesMultiple);
			setErrorsMultiple(initialValuesMultiple);
		} else {
			setFormData(initialValues);
			setErrors(initialValues);
		}
	};

	const handleSubmitMultiple = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("formData",formData);
		console.log("formDataMultiple",formDataMultiple);
		if (validateFormMultiple()) {
			const postData = new FormData();
			if (formDataMultiple.fileArray && formDataMultiple.filenames && formDataMultiple.resourceType) {
				formDataMultiple.fileArray.forEach(file => postData.append("file", file));
				formDataMultiple.filenames.forEach(name => postData.append("filename", name.replace(/\s/g, "")));
				postData.append("resourceType", formDataMultiple.resourceType);
				postData.append("path", formDataMultiple.path ?? "");
			}

			setLoadingButton(true);

			try {
				const response = await fetchRequest({ urlEndpoint: RESOURCES_CREATE, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);
			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("formData",formData);
		console.log("formDataMultiple",formDataMultiple);
		if (validateForm()) {
			const postData = new FormData();

			if (formData.file && formData.filename && formData.resourceType) {
				postData.append("file", formData.file);
				postData.append("filename", formData.filename.replace(/\s/g, ""));
				postData.append("resourceType", formData.resourceType);
				postData.append("path", formData.path ?? "");
			}
			setLoadingButton(true);

			try {
				const response = await fetchRequest({ urlEndpoint: RESOURCES_CREATE, method: "POST", abortController, body: postData, isFormData: true })();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);

			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			}

		}
	};

	

	return (
		<FormTemplate
			setOpenSnackBar={setOpenSnackBar}
			handleSubmit={multiple ? handleSubmitMultiple : handleSubmit}
			getFormOptions={getFormOptions(CREATE_RES)}
			openSnackBar={openSnackBar}
			severity={severity}
			message={message}
			title={title}
			loadingButton={loadingButton}
		>
			<Stack direction="row" alignItems={"center"} sx={{ pl: "12px" }}>
				<Typography >Vuoi caricare più file?</Typography>
				<Switch
					checked={multiple}
					onChange={() => {
						setMultiple(!multiple);
						resetForm();
					}}
					name="branchIdSwitch"
				/>
			</Stack>
			{multiple ? (
				<React.Fragment>
					<UploadField
						titleField="File della risorsa statica"
						name={"file"}
						files={formDataMultiple.fileArray}
						clearFile={clearSingleFile}
						error={errorsMultiple.fileArray}
						setFormData={setFormDataMultiple}
						formData={formDataMultiple}
						keepExtension={true}
						multiple={true}
					/>
					{errorsMultiple.filenames && errorsMultiple.filenames.some((error: any) => error) && (
						<Box mx={"10px"} mb={1}>
							<FormHelperText error>
								{errorsMultiple.filenames.find((error: any) => error)}
							</FormHelperText>
						</Box>
					)}
					<Grid item xs={12} my={1}>
						<TextField
							fullWidth
							id="resourceType"
							name="resourceType"
							select
							label={"Estensione del file"}
							placeholder={"HTML"}
							size="small"
							value={formDataMultiple.resourceType}
							onChange={handleChange}
							error={Boolean(errorsMultiple.resourceType)}
							helperText={errorsMultiple.resourceType}
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
							value={formDataMultiple.path}
							onChange={handleChange}
							error={Boolean(errorsMultiple.path)}
							helperText={errorsMultiple.path}
							inputProps={{ "data-testid": "path-test" }}
						>
						</TextField>
					</Grid>
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
								)
								)}
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
						{/* <Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="description"
					name="description"
					label={"Descrizione (Opzionale)"}
					placeholder={""}
					size="small"
					value={formData.description}
					onChange={handleChange}
					error={Boolean(errors.description)}
					helperText={errors.description}
					inputProps={{ "data-testid": "description-test" }}
				>
				</TextField>
			</Grid> */}
					</React.Fragment>
				)
			}
		</FormTemplate>
	);
};

export default CreateResources;
