import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  // local state to track if password is visible
  const [isShowPassword, setIsShowPassword] = useState(false);

  // toggles password visibility
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {/* toggle icon */}
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-blue-500 cursor-pointer"
          onClick={toggleShowPassword} // show as plain text
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword} // hide password
        />
      )}
    </div>
  );
};

export default PasswordInput;
