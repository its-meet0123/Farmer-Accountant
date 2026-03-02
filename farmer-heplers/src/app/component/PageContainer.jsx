import React from "react";
import LanguageChangeDropDown from "./LanguageChangeDropdown";

const AuthContainer = ({
  children,
  title,
  subtitle,
  showLangButton = true,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      {showLangButton && (
        <div className="absolute top-6 right-6">
          {/* <select className="bg-white/20 text-white border border-white/30 rounded-md px-3 py-1 outline-none cursor-pointer backdrop-blur-sm">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select> */}
          <LanguageChangeDropDown />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden min-h-[550px]">
        <div className="hidden md:flex md:w-1/2 bg-indigo-700 p-12 flex-col justify-center text-white">
          <h1 className="text-4xl font-bold mb-4 italic">Welcome Back!</h1>
          <p className="text-indigo-100 text-lg">
            Experience the most powerful workflow management tool. Start your
            journey with us today.
          </p>
          <div className="mt-8 h-1 w-20 bg-white/30 rounded"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
