import { Grid, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import UploadFileWithButton from "../UploadFileComponents/UploadFileWithButton";

const MAX_COUNT = 5;

export default function MultiUploadField() {
	const [uploadedFiles, setUploadedFiles] = useState([] as Array<File>);
	const [fileLimit, setFileLimit] = useState(false);

	const handleUploadedFiles = (files: Array<File>) => {
		const uploaded = [...uploadedFiles];
		// eslint-disable-next-line functional/no-let
		let limitExceeded = false;
		// eslint-disable-next-line array-callback-return
		files.some((file) => {
			if (uploaded.findIndex((f) => f.name === file.name) === -1) {
				// eslint-disable-next-line functional/immutable-data
				uploaded.push(file);
				if (uploaded.length === MAX_COUNT) {setFileLimit(true);}
				if (uploaded.length > MAX_COUNT) {
					alert (`Non è possibile caricare più di ${MAX_COUNT} file contemporaneamente`);
					setFileLimit(false);
					limitExceeded = true;
					return true;
				}
			}
		});
		if (!limitExceeded) {setUploadedFiles(uploaded);}
		console.log("file caricati: ",uploaded);
	};

	const handleFileEvent = (e:React.ChangeEvent<HTMLInputElement>) => {
		const chosenFiles = Array.prototype.slice.call(e.target.files);
		handleUploadedFiles(chosenFiles);
	};


	return (
		<React.Fragment>
			<Grid xs={12} item my={1}>
                	<Typography variant="body1">Risorsa</Typography>
			</Grid>
			<Grid xs={12} item >
				<div>
					<input id="fileUpload" type="file" multiple
						accept="*"
						onChange={handleFileEvent}
						disabled={fileLimit} />

					<label htmlFor="fileUpload">
						<a className={`btn btn-primary ${!fileLimit ? "" : "disabled"}`}></a>
					</label>

					<div className="uploaded-files-list">
						{uploadedFiles.map((file, i) => (
							<div key={i}>
								{file.name}
							</div>
						))}

					</div>
				</div>
			</Grid>
		</React.Fragment>
		
	);
    
}