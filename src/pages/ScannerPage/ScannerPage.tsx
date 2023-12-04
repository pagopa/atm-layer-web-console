import { Box } from "@mui/system";
import KeyboardHideOutlinedIcon from "@mui/icons-material/KeyboardHideOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../../components/Footer";
import { Ctx } from "../../DataContext";


export const ScannerPage = () => {

	const backButton = () => console.log("Bottone");

	const context = useContext(Ctx);
	const {interfaceType}=context;
            
	return (
		<>
			<Header 
				bankTitle="Test"
				bankLogo={getCompletePathImage("icon-52x52.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent 
					title={"Scansiona il codice QR"} 
					subTitle={"Avvicinalo al lettore luminoso posizionato sopra allo schermo."}
				/>
			</Box>
			<Box textAlign={"center"}  marginTop={7}>
				<img src={getCompletePathImage("img-200x200.png")} width={"300px"} height={"300px"}/>
			</Box>
			
			{
				interfaceType ? 
					<>
						<Box textAlign={"center"} marginTop={3}>
							<Button
								color="primary"
								size="medium"
								startIcon={<KeyboardHideOutlinedIcon color="primary"/>}
								variant="outlined"
								onClick={backButton}
							>
                    Inserisci tu i dati
							</Button>
						</Box>
						<Footer backButton={backButton} /> 
					</>
					: <Footer 
						backButton={backButton} 
						continueButton={"Inserisci tu i dati"} 
						startIcon={<KeyboardHideOutlinedIcon color="disabled" fontSize="medium"/>}
						endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }}/>}
					/>
			}
			
			
		</>
	);	
};