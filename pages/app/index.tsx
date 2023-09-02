import DashboardLayout from "@/layouts/dashboard";
import React from "react";

import UserTable from "@/components/app/tables/user-table";

const AppEntry = () => {
  return (
    <DashboardLayout>
      <main>
        <UserTable />
      </main>
    </DashboardLayout>
  );
};

export default AppEntry;
