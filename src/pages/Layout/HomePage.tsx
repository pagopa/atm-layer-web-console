import {Box } from "@mui/material";
import { useContext } from "react";
import { Header } from "../../components/Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../../components/Footer";
import { CardLayout } from "../../components/CardComponents/CardLayout";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { Ctx } from "../../DataContext";
import { theme } from "../../assets/jss/themePagoPa";

export const HomePage = () => {

	
	const backButton = () => console.log("Bottone");
            
	return (
		<>
			<Header />
			<Box marginTop={theme.spacing(3)} marginLeft={theme.spacing(3)} textAlign={"start"}>
				<TitleComponent 
					title={"A quale servizio vuoi accedere?"} 
					subTitle={"Puoi effettuare pagamenti verso la PA e gestire le tue iniziative di welfare."}
				/>
			</Box>
			<Box 
				className="App" 
				minHeight="70vmin"
				justifyContent={"center"}
				ml={3} 
			>
				 <CardLayout /> 
			</Box>
			<Footer disabled={false} backButton={backButton} />
		</>
	);	
};
