import { useContext } from "react";
import { Box } from "@mui/system";
import { Ctx } from "../../DataContext";
import SideBar from "../../components/Menu/SideBar";
import NewResources from "./Forms/CreateResources";

const ResourcesPage = () => {
	const { headerHeight } = useContext(Ctx);

	return (
		<Box
			display="flex"
			flexDirection="row"
		>
			<SideBar name={"Resources"} />
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={"85vw"}
			>
				<Box
					alignItems="center"
					sx={{
						maxHeight: `calc(100vh - ${headerHeight}px)`,
						overflowY: "auto",
						mr: "14px"
					}} >
					<NewResources />
				</Box>
			</Box>
		</Box>
	);
};

export default ResourcesPage;