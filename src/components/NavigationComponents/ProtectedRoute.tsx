import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import routes from "../../routes";
import { Ctx } from "../../DataContext";
import { getProfileDescriptions } from "../Commons/Commons";

type Props = {
	profileRequired:string;
};

const ProtectedRoute = ({profileRequired}:Props) => {
	const navigate = useNavigate();
	const { loggedUserInfo } = useContext(Ctx);
  
	useEffect(() => {
		if (getProfileDescriptions(loggedUserInfo)?.includes(profileRequired)===false) {
			navigate(routes.UNAUTHORIZED_PAGE);
		}
	}, [loggedUserInfo, navigate]);
  
	return <Outlet />;
};
  
export default ProtectedRoute;
