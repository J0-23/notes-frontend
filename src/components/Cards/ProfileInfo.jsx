import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        {/* profile avatar (circle with user initials) */}
        <div className="hidden md:flex w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo.fullName)}
        </div>

        {/* user name and logout button */}
        <div>
          <p className="text-sm font-medium">{userInfo.fullName}</p>
          <button
            className="text-sm text-slate-700 underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
