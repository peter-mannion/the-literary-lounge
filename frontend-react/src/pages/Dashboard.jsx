import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/api";

export default function Dashboard() {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api("http://localhost:5000/api/users", "GET", null, token).then(setUsers);
  }, [token]);

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <h2>Users:</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
