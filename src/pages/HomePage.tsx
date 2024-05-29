import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import HomeCardComponent from "../components/CardComponents/HomeCardComponent";
import { homePageCard } from "../utils/homePageCard";
import { HomePageTitle } from "../components/TitleComponents/HomePageTitle";
import { Ctx } from "../DataContext";
import { getRoleIdsByUser } from "../components/Commons/Commons";
import BoxPageLayout from "./Layout/BoxPageLayout";



export default function HomePage () {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getRoleIdsByUser(loggedUserInfo);

	const isCardVisible = (cardId: string) => {
		const visibilityRules: { [key: string]: Array<number> } = {
		  users: [5],
		};

		if (!visibilityRules[cardId]) {
		  return true;
		}
	
		return visibilityRules[cardId].some((profileId) => userProfileIds.includes(profileId));
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
						  <Grid item xs={xsValue} mx={"auto"} key={e.title}>
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