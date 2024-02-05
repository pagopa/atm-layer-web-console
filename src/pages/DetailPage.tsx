import DetailBox from "../components/Commons/DetailBox";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";


const DetailPage = () => (
	<BoxPageLayout px={10}>
		<DetailBox />
		<BpmnDetailButtons />
	</BoxPageLayout>
);

export default DetailPage;
