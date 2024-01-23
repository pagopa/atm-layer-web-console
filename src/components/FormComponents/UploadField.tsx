import { Grid, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import UploadFileWithButton from "../UploadFileComponents/UploadFileWithButton";

type Props = {
    name: string;
    titleField?: string;
    file?: string;
    changeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearFile: () => void;
    error?: string; 
};


export default function UploadField({titleField, file, clearFile, changeFile,error, name}:Props) {
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
					onChange={(e: ChangeEvent<HTMLInputElement>) => changeFile(e)}
					onClick={clearFile}
					error={error}
				/>
			</Grid>
		</React.Fragment>
	);
}
