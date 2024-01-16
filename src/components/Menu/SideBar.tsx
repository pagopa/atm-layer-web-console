import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/system/Box";
import { filterOptionsByLabel, menuOptionsButton } from "../../utils/MenuOptions";

const bpmnList = menuOptionsButton[0];
const resourcesList = menuOptionsButton[1];
const workflowList = menuOptionsButton[2];

type Props = {
    name: string;
};


export const SideBar = ({ name }: Props) => (
	<Box /* position={"fixed"} */ borderRight={1} height={"100%"} width={"15vw"}>
		<List sx={{ width: "100%", maxWidth: 360 }}>
			{filterOptionsByLabel(name).map((optionsGroup, i) => (
				<div key={i}>
					{optionsGroup.options.map((option, j) => (
						<ListItem key={option.label} disablePadding>
							<ListItemButton role={undefined} dense onClick={option.onClick}>
								<ListItemText primary={option.label} />
							</ListItemButton>
						</ListItem>
					))}
				</div>
			))}
		</List>
	</Box>
);




export default SideBar;