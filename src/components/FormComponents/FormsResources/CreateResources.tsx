import { Grid, MenuItem, TextField } from "@mui/material";
import { useState, useContext } from "react";
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


export const CreateResources = () => {

	const [loadingButton, setLoadingButton] = useState(false);

	const { getFormOptions } = formOption();
	const { isValidResourcesFilename, isValidPath } = checks();
	const initialValues: ResourcesDto = {
		file: undefined,
		filename: "",
		resourceType: "",
		path: "",
		description: ""
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const optionFormMenu = [{ key: "HTML", value: "HTML", }, { key: "OTHER", value: "OTHER" }];


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
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
					: "Il nome del file deve essere nel formato nome.estensione gli unici caratteri speciali ammessi sono _ e - ",
			resourceType: formData.resourceType ?
				formData.resourceType  === "HTML" && fileExtension && fileExtension === "html" || 
				formData.resourceType  === "OTHER" && fileExtension && fileExtension !== "html" ?
					""
					: "L'estensione del file non corrisponde con quella selezionata"
				: "Campo obbligatorio",
			path: formData.path ? 
				(isValidPath(formData.path) ? "" : "La stringa non deve iniziare, né finire con / e non può contenere caratteri speciali, va indicato solo il precorso e non il nome del file") : ""
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const clearFile = () => {
		setFormData({ ...formData, file: undefined, filename: "" });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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

		</FormTemplate >
	);
};

export default CreateResources;