import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const CheckIsAuthenticated = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from
    ? location.state.from.pathname + (location.state.from.search || "")
    : "/home";

  useEffect(() => {
    const unauthPages = ["/login", "/signup"];
    if (isAuthenticated && unauthPages.includes(location.pathname)) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname, from]);

  return children;
};

export default CheckIsAuthenticated;
