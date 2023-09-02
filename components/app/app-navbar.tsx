import React from "react";
import SearchInput from "../search-input";
import UserDropdown from "./user-dropdown";

const AppNavbar = () => {
  return (
    <header className="bg-[#202020] rounded-b-3xl px-8 py-4 flex items-center justify-between">
      <h3>AppNavbar</h3>
      <div className="w-48">
        <SearchInput />
      </div>
      <UserDropdown />
    </header>
  );
};

export default AppNavbar;
