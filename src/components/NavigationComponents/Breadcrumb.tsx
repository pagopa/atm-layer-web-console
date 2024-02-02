
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Prop = {
    breadcrumb: any;
};

const BreadCrumb = ({ breadcrumb }: Prop) => (
	<Breadcrumbs
		separator={<NavigateNextIcon fontSize="small" />}
		aria-label="breadcrumb"
	>
		{breadcrumb}
	</Breadcrumbs>
);

export default BreadCrumb;
