import { Grid, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import UploadFileWithButton from "../UploadFileComponents/UploadFileWithButton";

type Props = {
    name: string;
    titleField?: string;
    file?: File;
    clearFile: () => void;
    error?: string;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	formData: any;
	keepExtension?: boolean;
};


export default function UploadField({titleField, file, clearFile,error, name, setFormData, formData, keepExtension}:Props) {

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				<UploadFileWithButton
					name={name}
					file={file}
					onChange={handleChangeFile}
					onClick={clearFile}
					error={error}
					allowedType="*"
				/>
			</Grid>
		</React.Fragment>
	);
}
