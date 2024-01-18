import React, { ChangeEvent, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import UploadFileWithButton from "../components/UploadFileWithButton";
import { BpmnDto } from "../../../model/BpmnModel";

type Props = {
	errors:any ;
	formData: any; 
	setFormData: any; 
	
  };
export const NewBpmn = ({formData, setFormData, errors }:Props) => {
	const theme = useTheme();

	

	

	

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, file: e.target.value });
	};

	const clearFile = () => {
		setFormData({ ...formData, file: "" });
	};



	return (
		
	// <Box sx={inputGroupStyle} mt={4}>
				
		<React.Fragment>	
						
			<Grid container item>
				<Typography variant="body1">File BPMN</Typography>
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
					label={"Nome del file"}
					placeholder={"Nome del file"}
					size="small"
					value={formData.fileName}
					onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
					error={Boolean(errors.fileName)}
					helperText={errors.fileName}
				/>
			</Grid>
			<Grid container item my={1}>
				<TextField
					fullWidth
					id="functionType"
					name="functionType"
					label={"Tipo di funzione"}
					placeholder={"Tipo di funzione"}
					size="small"
					value={formData.functionType}
					onChange={(e) => setFormData({ ...formData, functionType: e.target.value })}
					error={Boolean(errors.functionType)}
					helperText={errors.functionType}
				/>
			</Grid>
			
				
		
		</React.Fragment>
		// </Box>
		
	);
};

export default NewBpmn;
