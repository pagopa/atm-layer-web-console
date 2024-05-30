import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import routes from "../../routes";
import { getProfileDescriptions } from "../Commons/Commons";

type Props = {
	profileRequired:string;
};

const ProtectedRoute = ({profileRequired}:Props) => {
	const navigate = useNavigate();
	const loggedUserInfo = JSON.parse(sessionStorage.getItem("loggedUserInfo") ?? "");
  
	useEffect(() => {
		if (loggedUserInfo.userId && !getProfileDescriptions(loggedUserInfo)?.includes(profileRequired)) {
			navigate(routes.UNAUTHORIZED_PAGE);
		}
	}, [loggedUserInfo, navigate]);
  
	return <Outlet />;
};
  
export default ProtectedRoute;
