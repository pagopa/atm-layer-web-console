import { useContext } from "react";
import { Box } from "@mui/system";
import { Ctx } from "../../DataContext";
import SideBar from "../../components/Menu/SideBar";
import CreateResources from "./Forms/CreateResources";
import UpdateResources from "./Forms/UpdateResources";

const ResourcesPage = () => {
	const { headerHeight } = useContext(Ctx);

	return (
		<Box
			display="flex"
			flexDirection="row"
		>
			{/* <SideBar name={"Resources"} /> */}
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={"100vw"}
			>
				<Box
					alignItems="center"
					sx={{
						maxHeight: `calc(100vh - ${headerHeight}px)`,
						overflowY: "auto",
						mr: "14px"
					}} >
					<CreateResources />
					<UpdateResources />
				</Box>
			</Box>
		</Box>
	);
};

export default ResourcesPage;