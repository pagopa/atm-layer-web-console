import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import ClearIcon from "@mui/icons-material/Clear";
import { Header } from "../../../components/Header";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { Footer } from "../../../components/Footer";

const UploadFile = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [files, setFiles] = useState<Array<File>>([]);

	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		onDrop: (acceptedFiles: Array<File>) => {
			setFiles(
				acceptedFiles.map((file) => ({
					...file,
					preview: URL.createObjectURL(file),
				}))
			);
		},
	});

	useEffect(() => {
		console.log("FILE", ...files);
	}, [files]);

	return (
		<>
			<Header />
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent
					title={"Scansiona il codice QR"}
					subTitle={"Avvicinalo al lettore luminoso posizionato sopra allo schermo."}
				/>
			</Box>
			<Box marginTop={7} textAlign={"center"} display="flex" alignItems="center" flexDirection="column">

				<Box
					{...getRootProps()}
					border={"dashed"}
					width="60%"
					minHeight={"200px"}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ backgroundColor: "#0073E614", borderColor: theme.palette.primary.main }}
				>
					<input {...getInputProps()} />

					<Box
						height="100%"
						display="flex"
						alignItems={"center"}
						flexDirection={files.length > 0 ? "row" : "column"}

					>
						{files.length > 0 ? (
							<><AttachFileIcon sx={{ mr: 2 }} /><Typography marginRight={1}>{acceptedFiles[0].name}</Typography><IconButton onClick={() => setFiles([])}>
								<ClearIcon />
							</IconButton></>
						) : (
							<Button variant="contained" color="primary" onClick={open}>
									Seleziona un File
							</Button>
						)}
					</Box>


				</Box>
			</Box>

			<Footer
				backButton={() => navigate("/")}
				disabled={false}
				continueButton={"Avanti"}
				// startIcon={<KeyboardHideOutlinedIcon color="disabled" fontSize="medium" />}
				endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }} />}
			/>
		</>
	);
};

export default UploadFile;
