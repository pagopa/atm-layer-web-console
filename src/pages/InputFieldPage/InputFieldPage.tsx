import { Box, useTheme } from "@mui/system";
import { theme } from "@pagopa/mui-italia";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useRef, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { useFormik } from "formik";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { CustomTextField } from "../../components/CustomTextField/CustomtextField";
import { Footer } from "../../components/Footer";
import checks from "../../commons/checks";

export const InputFieldPage = () => {
	const backButton = () => console.log("Bottone");

	const [charCounter, setCharCounter] = useState(0);
	const [endIconVisible, setEndIconVisible] = useState(true);
	const [error, setError] = useState(false);
	const theme = useTheme();
	const [text, setText] = useState("");

	const handleChange = (e: React.ChangeEvent<any>) => {
		setText(e.target.value);
	};

	useEffect(() => {
		console.log("counter", charCounter);
	}, [charCounter]);

	const enebledSubmit = (value: string) => !!(value.length !== 0);

	const handleError = (value: string) => {
		if(value.length < 18) {
			setError(true);
			setEndIconVisible(true);
		} else {
			setError(false);
			setEndIconVisible(false);
		}
	};

	const submit = (value: string) => {
		handleError(value);
		console.log("value:", error ? "Error!" : value);
	};
 
	return (
		<>
			<Header
				bankTitle="Test"
				bankLogo={getCompletePathImage("icon-52x52.png")}
				serviceDescription="Servizi di pubblica utilità"
			/>
			<Box marginTop={theme.spacing(3)} textAlign={"center"}>
				<TitleComponent
					title={"Inserisci il codice avviso"}
					subTitle={"Ha 18 cifre, lo trovi vicino al codice QR."}
				/>
			</Box>
			<Box display={"flex"} minHeight="70vmin" justifyContent={"center"} alignItems={"center"}>
				<Box justifyContent={"center"} minWidth={"25%"}>
					<CustomTextField
						id={"code"}
						name={"code"}
						label={"Codice Avviso"}
						value={text}
						error={error}
						icons={endIconVisible ? "Report" : undefined}
						onChange={(e) => handleChange(e)}
						variant={"outlined"}
					/>
				</Box>
			</Box>
			<Footer
				backButton={backButton}
				disabled={!enebledSubmit(text)}
				handleClick={() => submit(text)}
				continueButton={"Continua"}
				endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }} />}
			/>
		</>
	);
};
