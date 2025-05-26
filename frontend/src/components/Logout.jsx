import { useNavigate } from "react-router-dom";

export default function Logout() {
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("Anda telah logout!");
    history.push("/login");
  };

  return (
    <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
      Logout
    </button>
  );
}
