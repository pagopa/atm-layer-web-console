import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/system/Box";
import { Typography, useTheme } from "@mui/material";
import { filterOptionsByLabel } from "../../utils/MenuOptions";

type Props = {
	name: string;
};

export const SideBar = ({ name }: Props) => {

	const theme = useTheme();

	return (
		<Box /* position={"fixed"} */ height={"100%"} width={"15vw"}>
			<List sx={{ width: "100%" }} disablePadding>
				{filterOptionsByLabel(name).map((optionsGroup, i) => (
					<div key={optionsGroup.id}>
						{optionsGroup.options.map((option) => (
							<ListItem key={option.label} disablePadding>
								<ListItemButton role={undefined} dense sx={{ p: 2, pl: 6 }}>
									<Typography variant="body1" fontWeight={"600"} color={theme.palette.primary.main}>
										{option.label}
									</Typography>
								</ListItemButton>
							</ListItem>
						))}
					</div>
				))}
			</List>
		</Box>
	);
};




export default SideBar;