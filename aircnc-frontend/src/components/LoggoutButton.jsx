import React from "react";
import { useHistory } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

export default function LoggoutButton() {
  const history = useHistory();

  const hangleLoggout = () => {
    localStorage.removeItem("user_id");
    history.push("/");
  };

  return (
    <button className="loggout-btn" onClick={hangleLoggout} title="Loggout">
      <FaSignOutAlt />
    </button>
  );
}
