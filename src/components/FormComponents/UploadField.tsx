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
	allowedFile?: string;
};


export default function UploadField({titleField, file, clearFile,error, name, setFormData, formData, allowedFile}:Props) {

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const selectedFile = files[0];
			setFormData({ ...formData, file: selectedFile });
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
