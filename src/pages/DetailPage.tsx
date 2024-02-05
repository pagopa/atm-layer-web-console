import ActionsBox from "../components/Commons/ActionsBox";
import DetailBox from "../components/Commons/DetailBox";
import BoxPageLayout from "./Layout/BoxPageLayout";


const DetailPage = () => (
	<BoxPageLayout px={10}>
		<DetailBox />
		<ActionsBox />
	</BoxPageLayout>
);

export default DetailPage;
