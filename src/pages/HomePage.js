import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h1>Welcome {auth.user?.username}</h1>
      <button
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default HomePage;
