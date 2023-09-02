import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React from "react";
import { SearchIcon } from "./icons";

interface SearchIconProps {
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const SearchInput: React.FC<SearchIconProps> = ({
  placeholder,
  startContent,
  endContent,
}) => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 py-4",
        input: "text-lg py-6",
      }}
      size="lg"
      endContent={
        endContent ? (
          endContent
        ) : (
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        )
      }
      labelPlacement="outside"
      placeholder={placeholder ? placeholder : "Search..."}
      startContent={
        startContent ? (
          startContent
        ) : (
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        )
      }
      type="search"
    />
  );
};

export default SearchInput;
