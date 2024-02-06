import CreateResources from "../components/FormComponents/FormsResources/CreateResources";
import UpdateResources from "../components/FormComponents/FormsResources/UpdateResources";
import FormPageTemplate from "./Layout/FormPageTemplate";

const ResourcesPage = () => (
	<FormPageTemplate>
		<CreateResources />
		<UpdateResources />
	</FormPageTemplate>

);

export default ResourcesPage;