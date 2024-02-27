import { Box } from "@mui/system";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import { ActionAlert } from "../../components/Commons/ActionAlert";
import DetailBox from "../../components/Detail/DetailBox";
import BoxPageLayout from "./BoxPageLayout";

type Props = {
	detail:any;
    detailFields: any;
    detailTitle: string;
    breadComponent?: any;
    children?: React.ReactNode;
	openSnackBar?: boolean;
	setOpenSnackBar?:React.Dispatch<React.SetStateAction<boolean>>;
	type?:string;
	message?:string;
	severity?:string;
	title?:string;

};

const DetailPageTemplate = ({
	detail,
	detailFields,
	detailTitle,
	breadComponent,
	children,
	openSnackBar, 
	setOpenSnackBar,
	type,
	message,
	severity,
	title,
	
}: Props) => (
	<BoxPageLayout px={10}>
		<Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
			{breadComponent&&<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />}
			<Box width={"25%"}>
				<ActionAlert setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar} severity={severity} message={message} title={title} type={type} />
			</Box>
		</Box>
		<DetailBox detail={detail} fields={detailFields} detailTitle={detailTitle} />
		{children}
	</BoxPageLayout>
);

export default DetailPageTemplate;