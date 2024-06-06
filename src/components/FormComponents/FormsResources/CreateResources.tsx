import { FormHelperText, Grid, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import { ResourcesDto } from "../../../model/ResourcesModel";
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
	const theme = useTheme();
	const { getFormOptions } = formOption();
	const { isValidResourcesFilename, isValidPath } = checks();
	const { extractExtensionFromFileName } = formatValues();
	const initialValues: ResourcesDto = {
		fileArray: [] as Array<File>,
		filenames: [] as Array<string>,
		resourceType: "",
		path: "",
		description: ""
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState<any>({});
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
	
		if(formData.fileArray && formData.filenames) {
			// eslint-disable-next-line functional/immutable-data
			const fileExtensions = formData.filenames.map(name => name.split(".").pop()?.toLowerCase());
			const newErrors = {
				fileArray: formData.fileArray.length > 0 ? "" : "Campo obbligatorio",
				filenames: formData.filenames.map(name =>
					isValidResourcesFilename(name)
						? ""
						: "Il nome del file deve essere nel formato nome.estensione; gli unici caratteri speciali ammessi sono _ e -"
				),
				resourceType: formData.resourceType
					? formData.resourceType === "HTML" && fileExtensions.every(el => el === "html")
						|| formData.resourceType === "OTHER" && !fileExtensions.includes("html")
						? ""
						: "L'estensione del file non corrisponde con quella selezionata"
					: "Campo obbligatorio",
				path: formData.path
					? isValidPath(formData.path)
						? ""
						: "La stringa non deve iniziare, né finire con / e non può contenere caratteri speciali; va indicato solo il percorso e non il nome del file"
					: ""
			};
	
			setErrors(newErrors);
	
			console.log("Errors:", newErrors);
	
			return Object.values(newErrors).every((error) =>
				Array.isArray(error) ? error.every(e => !e) : !error
			);
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
			const updatedFileArray = removeArrayItem(index,formData?.fileArray);
			const updatedFileNames = removeArrayItem(index,formData?.filenames);
			setFormData({ ...formData, fileArray:updatedFileArray, filenames: updatedFileNames });
			setErrors({...errors, fileArray: "", filenames: []});
		}
		
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = new FormData();
			if (formData.fileArray && formData.filenames && formData.resourceType) {
				formData.fileArray.forEach(file => postData.append("file", file));
				formData.filenames.forEach(name => postData.append("filename", name.replace(/\s/g, "")));
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
			handleSubmit={handleSubmit}
			getFormOptions={getFormOptions(CREATE_RES)}
			openSnackBar={openSnackBar}
			severity={severity}
			message={message}
			title={title}
			loadingButton={loadingButton}
		>
			<UploadField
				titleField="File della risorsa statica"
				name={"file"}
				files={formData.fileArray}
				clearFile={clearSingleFile}
				error={errors.fileArray}
				setFormData={setFormData}
				formData={formData}
				keepExtension={true}
				multiple={true}
			/>
			{errors.filenames && errors.filenames.some((error: any) => error) && (
				<Box mx={"10px"} mb={1}>
					<FormHelperText error>
						{errors.filenames.find((error: any) => error)}
					</FormHelperText>
				</Box>
			)}
			{/* <Grid item xs={12} my={1}>
				<TextField
					fullWidth
					id="filenames"
					name="filenames"
					label={"Nomi dei file con Estensione"}
					placeholder={"Esempio_file.txt"}
					size="small"
					value={formData.filenames}
					onChange={handleChange}
					error={Boolean(errors.filenames)}
					helperText={errors.filename}
					inputProps={{ "data-testid": "file-name-test" }}
					hidden={errors.filename?false:true}
				/>
			</Grid> */}
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
