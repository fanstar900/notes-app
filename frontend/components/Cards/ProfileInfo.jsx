import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogOut, userInfo }) => {
  if (!userInfo || !userInfo.fullName) {
    return null;
  }
  return (
    <div className="d-flex flex-column align-items-center p-2">
      <div
        className="rounded-circle text-white d-flex justify-content-center align-items-center"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#bdbcae",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {getInitials(userInfo.fullName)}
      </div>
      <button
        onClick={onLogOut}
        className="btn p-0 mt-1"
        style={{
          fontSize: "12px",
          color: "black",
          background: "none",
          border: "none",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default ProfileInfo;
