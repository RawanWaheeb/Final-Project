import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/User.context";

export default function GuestRoute({ children }) {
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("🔍 Checking Guest Route:", location.pathname);
    console.log("🔑 Token:", token);

    if (!token && location.pathname !== "/login") {
      console.log("🚨 Redirecting to /login...");
      navigate("/login", { replace: true });
    }
  }, [location.pathname, token, navigate]);

  
  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
