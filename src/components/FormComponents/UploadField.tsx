import { Grid, Typography } from "@mui/material";
import React from "react";
import UploadFileWithButton from "../UploadFileComponents/UploadFileWithButton";
import UploadMultipleWithButton from "../UploadFileComponents/UploadMultipleWithButton";
import { removeArrayItems, resetErrors } from "../Commons/Commons";

type Props = {
    name: string;
    titleField?: string;
    file?: File;
	files?: Array<File>;
    clearFile: any;
	clearMultipleFile?: any;
    error?: string;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	formData: any;
	keepExtension?: boolean;
	multiple?: boolean;
	setErrors: any;
	customAlert?: any;
};


export default function UploadField({titleField, file, files, clearFile, clearMultipleFile, error, name, setFormData, formData, keepExtension, multiple, setErrors, customAlert}:Props) {

	const handleMultipleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({});
		const files = Array.from(e.target.files || []);
		if (files && files.length > 0) {
			// eslint-disable-next-line functional/no-let
			let uploadedFilenames = files.map(file => file.name);

			const duplicateIndexes = (uploadedFilenames.map((name: any, index:number)=> formData?.filenames?.includes(name) ? index : undefined)).filter(e =>e || e === 0);
			if (duplicateIndexes.length>0){
				const duplicatedNames = duplicateIndexes.map(index => index || index===0 ? uploadedFilenames[index] : "");
				removeArrayItems(duplicateIndexes,files);
				removeArrayItems(duplicateIndexes,uploadedFilenames);
				customAlert("Uno o più file selezionati sono già caricati nel form: "+ duplicatedNames.join("\n"));	
			};

			if (!keepExtension){
				uploadedFilenames = uploadedFilenames.map(file => file.substring(0, uploadedFilenames.lastIndexOf(".")));
			}
			setFormData({ ...formData, fileArray: [...formData.fileArray, ...files], filenames: [...formData.filenames, ...uploadedFilenames]});
		}
	};

	const handleSingleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({});
		const files = e.target.files;
		if (files && files.length > 0) {
			const selectedFile = files[0];
			// eslint-disable-next-line functional/no-let
			let uploadedFilename = selectedFile.name;
			if (!keepExtension){
				uploadedFilename = uploadedFilename.substring(0, uploadedFilename.lastIndexOf("."));
			}
			setFormData({ ...formData, file: selectedFile, filename: uploadedFilename});
		}
	};

	return (
		<React.Fragment>
			{titleField && 
                <Grid xs={12} item my={1}>
                	<Typography variant="body1">{titleField}</Typography>
                </Grid>
			}
			<Grid xs={12} item >
				{
					!multiple && clearFile ?
						<UploadFileWithButton
							name={name}
							file={file}
							onChange={handleSingleChangeFile}
							onClick={clearFile}
							error={error}
							allowedType="*"
						/>
						:
						<UploadMultipleWithButton
							name={name}
							files={files}
							onChange={handleMultipleChangeFile}
							onClickSingle={clearFile}
							onClickMultiple={clearMultipleFile}
							error={error}
							allowedType="*"
						/>
				}
				
			</Grid>
		</React.Fragment>
	);
}
