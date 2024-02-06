
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Prop = {
    breadcrumb: any;
    mb: any;
};

const BreadCrumb = ({ breadcrumb, mb }: Prop) => (
	<Breadcrumbs
		separator={<NavigateNextIcon fontSize="small" />}
		aria-label="breadcrumb"
		sx={{ marginBottom: mb }}
	>
		{breadcrumb}
	</Breadcrumbs>
);

export default BreadCrumb;
