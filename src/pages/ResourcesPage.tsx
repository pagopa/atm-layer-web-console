import { useContext } from "react";
import { Box } from "@mui/system";
import { Ctx } from "../DataContext";
import CreateResources from "../components/FormComponents/FormsResources/CreateResources";
import UpdateResources from "../components/FormComponents/FormsResources/UpdateResources";

const ResourcesPage = () => {
	const { headerHeight } = useContext(Ctx);

	return (
		<Box
			display="flex"
			flexDirection="row"
		>
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