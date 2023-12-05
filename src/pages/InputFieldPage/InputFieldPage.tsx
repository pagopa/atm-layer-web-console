import { Box } from "@mui/system";
import { theme } from "@pagopa/mui-italia";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { CustomTextField } from "../../components/CustomTextField/CustomtextField";
import { Footer } from "../../components/Footer";

export const InputFieldPage = () => {
	const backButton = () => console.log("Bottone");

	const [charCounter, setCharCounter] = useState(0);
	const [inputField, setInputField] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		console.log("counter", charCounter);
	}, [charCounter]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputField(event.target.value);
		setCharCounter(event.target.value.length);
	};

	const validate = () => {
		if (inputField.length !== 18) {
			setError(true);
		}
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
				<CustomTextField
					label={"Codice Avviso"}
					value={inputField}
					handleChange={(e) => handleChange(e)}
				/>
			</Box>
			<Footer
				backButton={backButton}
				continueButton={"Continua"}
				endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }} />}
			/>
		</>
	);
};
