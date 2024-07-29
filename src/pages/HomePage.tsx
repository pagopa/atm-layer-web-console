import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import HomeCardComponent from "../components/CardComponents/HomeCardComponent";
import { homePageCard } from "../utils/homePageCard";
import { HomePageTitle } from "../components/TitleComponents/HomePageTitle";
import { getProfileDescriptionFromStorage, getProfileIdsArray, getRoleDescriptionsByUser } from "../components/Commons/Commons";
import { EMULATOR, LETTURA, RILASCIO, SCRITTURA, UTENTI } from "../commons/constants";
import { Ctx } from "../DataContext";
import BoxPageLayout from "./Layout/BoxPageLayout";



export default function HomePage () {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getProfileIdsArray(loggedUserInfo);

	const isCardVisible = (cardId: string) => {
		const visibilityRules: { [key: string]: Array<number> } = {
		  	home: [LETTURA,SCRITTURA,RILASCIO,EMULATOR,UTENTI],
			process: [LETTURA,SCRITTURA,RILASCIO],
			static: [LETTURA,SCRITTURA],
			workflow: [LETTURA,SCRITTURA,RILASCIO],
		 	users: [UTENTI],
		};

		if (!visibilityRules[cardId]) {
		  return true;
		}
	
		return visibilityRules[cardId].some((profileDescription) => userProfileIds?.includes(profileDescription));
	};

	const visibleCards = homePageCard.filter(el => el.id !== "home" && isCardVisible(el.id));

	const xsValue = visibleCards.length === 3 ? 4 : 3;

	return(
		<BoxPageLayout px={15}>
			<Grid container spacing={0.5}>
				<HomePageTitle
					title={"Console management"}
					subTitle={"Console per la gestione delle risorse"}
				/>
			</Grid>
			<Box  my="8%">
				<Grid container spacing={8} >
					{
						homePageCard
							.filter(el => el.id !== "home" && isCardVisible(el.id))
							.map((e) => (
								<Grid item xs={12} sm={12} md={6} lg={4} mx={"auto"} key={e.title}>
									<HomeCardComponent
							  title={e.title}
							  description={e.description}
							  icon={e.icon}
							  pageLink={e.pageLink}
									/>
						  </Grid>
							))
					}
				</Grid>
			</Box>
		</BoxPageLayout>
	);
};
