import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

export const ProtectedLayout = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user === undefined || auth?.user === null) {
      navigate("/login");
    }
  }, [auth.token]);

  return children;
};
