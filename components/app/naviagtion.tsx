import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";

const Navigation = () => {
  return (
    <div className="w-64 p-4 rounded-lg bg-[#1D1D1D] ">
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default Navigation;
