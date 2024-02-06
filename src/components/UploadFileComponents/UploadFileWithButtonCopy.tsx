import { Button, Typography, IconButton, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

type Props = {
    name: string;
    allowedType?: string;
    file?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    error?: string;
};

const UploadFileWithButtonCopy = ({ name, allowedType, file, onChange, onClick, error }: Props) => {
	const theme = useTheme();
	const inputRef = useRef<HTMLInputElement>(null);

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
		fontWeight: theme.typography.fontWeightRegular
	});

	useEffect(() => {
		console.log("FILE:", file);
	}, [file]);

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Button
			disableElevation
			variant="text"
			color="negative"
			sx={{
				mt: 2,
				p: 2,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				backgroundColor: error ? theme.palette.error.dark : `${theme.palette.primary.main}15`,
				border: "2px solid",
				borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
				borderRadius: "8px",
				"&:hover": {
					backgroundColor: error ? theme.palette.error.light : `${theme.palette.primary.main}90`, // 80% di opacità durante l'hover
				},
				"&:active": {
					backgroundColor: error ? theme.palette.error.light : `${theme.palette.primary.main}70`, // 50% di opacità durante il click
				},
			}}
			onClick={handleButtonClick} // Gestione del click del bottone
		>
			{file ? (
				<React.Fragment>
					<Typography variant="body1" fontWeight={theme.typography.fontWeightBold} color={theme.palette.primary.contrastText}>
						{file.substring(file.lastIndexOf("\\") + 1)}
					</Typography>
					<IconButton onClick={onClick} disableRipple>
						<ClearIcon sx={{ color: theme.palette.primary.contrastText }} />
					</IconButton>
				</React.Fragment>
			) : (
				<React.Fragment>
                    Carica un file dal tuo computer
					<VisuallyHiddenInput
						ref={inputRef}
						type="file"
						name={name}
						accept={allowedType}
						onChange={onChange}
					/>
				</React.Fragment>
			)}
		</Button>
	);
};

export default UploadFileWithButtonCopy;

