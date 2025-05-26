import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ token, children }) => {
  useEffect(() => {
    if (!token) {
      alert("Anda harus login terlebih dahulu untuk mengakses halaman ini");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
