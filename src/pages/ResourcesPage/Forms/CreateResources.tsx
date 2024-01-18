import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useState, ChangeEvent } from "react";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import UploadFileWithButton from "../../BpmnPage/components/UploadFileWithButton";
import { ResourcesDto } from "../../../model/ResourcesModel";

export const CreateResources = () => {
	const theme = useTheme();

	const initialValues: ResourcesDto = {
		file: "",
		filename: "",
		resourceType: "",
		path:"",
	};

	const [formData, setFormData] = useState<ResourcesDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);

	const inputGroupStyle = {
		borderRadius: 1,
		border: 1,
		borderColor: theme.palette.divider,
		p: 3,
		mb: 3,
		width: "50%",
	};
    
	const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			filename: formData.filename ? "" : "Campo obbligatorio",
			resourceType: formData.resourceType ? "" : "Campo obbligatorio",
			path: formData.path ? "" : "",
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

	const changeResourceType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, resourceType: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			console.log("VALUES:", formData);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width={"100vw"}
		>
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent title={"Creazione Resources"} subTitle={""} />
			</Box>
			<Box sx={inputGroupStyle} mt={4}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid container item>
							<EditNoteIcon sx={{ mr: 1 }} />
							<Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per creare un nuovo Resource
							</Typography>
						</Grid>
						<Grid container item>
							<Typography variant="body1">Resource File</Typography>
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
								id="fileName"
								name="fileName"
								label={"Nome del file senza estensione"}
								placeholder={"Nome del file senza estensione"}
								size="small"
								value={formData.filename}
								onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
								error={Boolean(errors.filename)}
								helperText={errors.filename}
							/>
						</Grid>
						<Grid container item my={1}>
							<TextField
								fullWidth
								id="resourceType"
								name="resourceType"
								select
								label={"Estensione del file"}
								placeholder={"Estensione del file"}
								size="small"
								value={formData.resourceType}
								onChange={changeResourceType}
								error={Boolean(errors.filename)}
								helperText={errors.filename}
							>
								<MenuItem value={"HTML"}>HTML</MenuItem>
                            	<MenuItem value={"OTHER"}>OTHER</MenuItem>
							</TextField>
						</Grid>
					</Grid>
					<Box display="flex" justifyContent="flex-end" mt={2}>
						<Button variant="contained" type="submit">
                            Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default CreateResources;