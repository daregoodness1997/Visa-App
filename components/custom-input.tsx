import React, { forwardRef, useMemo } from "react";
import { useInput } from "@nextui-org/react";

import SearchIcon from "./SearchIcon";
import CloseFilledIcon from "./CloseFilledIcon";

const styles = {
  label: "text-black/50 dark:text-white/90",
  input: [
    "bg-transparent",
    "text-black/90 dark:text-white/90",
    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "shadow-xl",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "focus-within:!bg-default-200/50",
    "dark:hover:bg-default/70",
    "dark:focus-within:!bg-default/60",
    "!cursor-text",
  ],
};

interface CustomInputProps {
  Component?: React.ElementType;
  label?: string;
  domRef?: React.RefObject<HTMLInputElement>;
  description?: string;
  isClearable?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  shouldLabelBeOutside?: boolean;
  shouldLabelBeInside?: boolean;
  errorMessage?: string;
  // Add other props according to your actual usage
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      Component,
      label,
      domRef,
      description,
      isClearable,
      startContent,
      endContent,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      errorMessage,
      ...inputProps
    } = useInput({
      ...props,
      ref,
      // this is just for the example, the props below should be passed by the parent component
      label: "",
      type: "search",
      placeholder: "Type to search...",
      startContent: (
        <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      ),
      // custom styles
      classNames: {
        ...styles,
      },
    });

    const labelContent = <label {...inputProps.getLabelProps()}>{label}</label>;

    const end = useMemo(() => {
      if (isClearable) {
        return (
          <span {...inputProps.getClearButtonProps()}>
            {endContent || <CloseFilledIcon />}
          </span>
        );
      }

      return endContent;
    }, [isClearable, inputProps.getClearButtonProps, endContent]);

    const innerWrapper = useMemo(() => {
      if (startContent || end) {
        return (
          <div {...inputProps.getInnerWrapperProps()}>
            {startContent}
            <input {...inputProps.getInputProps()} />
            {end}
          </div>
        );
      }

      return <input {...inputProps.getInputProps()} />;
    }, [
      startContent,
      end,
      inputProps.getInnerWrapperProps,
      inputProps.getInputProps,
    ]);

    return (
      <Component {...inputProps.getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          {...inputProps.getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && (
          <div {...inputProps.getDescriptionProps()}>{description}</div>
        )}
        {errorMessage && (
          <div {...inputProps.getErrorMessageProps()}>{errorMessage}</div>
        )}
      </Component>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
