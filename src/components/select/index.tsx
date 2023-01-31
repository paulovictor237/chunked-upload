import { useI18N } from "@/hooks/i18n";
import { FC, useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";
import { twMerge } from "tailwind-merge";
import { Text } from "../text";
import { i18n } from "./i18n";
import { Props } from "./types";

const Select: FC<Props> = ({ label, labelClassName, onChange, ...rest }) => {
  const texts = useI18N(i18n);
  const id = useId();

  const [isOpen, setIsOpen] = useState(false);

  const getStylesDropdownIndicator = (isDisabled: boolean, isOpen: boolean) => {
    if (isOpen) return "#FAFAFA";
    if (isDisabled) return "#CCCCCC";
    return "#616161";
  };

  const getStylesOption = (isFocused: boolean, isSelected: boolean) => {
    if (isSelected) {
      return {
        backgroundColor: "#3475B4",
        color: "#FAFAFA",
      };
    }
    if (isFocused) {
      return {
        backgroundColor: "#F7F8F9",
        color: "#616161",
      };
    }
    return {
      backgroundColor: "#FAFAFA",
      color: "#616161",
    };
  };

  const getStylesControl = (isDisabled: boolean, isOpen: boolean) => {
    if (isDisabled) return "#EEEEEE";
    if (isOpen) return "#1F4883";
    return "#FFFFFF";
  };

  const getStylesContainer = (isFocused: boolean, isDisabled: boolean) => {
    if (isFocused) return "#97C8E8";
    if (isDisabled) return "#EEEEEE";
    return "#CBCBCB";
  };

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <FiChevronDown />
      </components.DropdownIndicator>
    );
  };

  const customStyles: StylesConfig = {
    option: (provided, state) => {
      const stylesOption = getStylesOption(state.isFocused, state.isSelected);
      return {
        ...provided,
        color: stylesOption.color,
        backgroundColor: stylesOption.backgroundColor,
        padding: "0.5rem 1rem",
        fontWeight: 500,
        fontSize: "1rem",
        borderRadius: "0.063rem",
      };
    },
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: getStylesDropdownIndicator(state.isDisabled, isOpen),
    }),
    control: (provided, state) => ({
      ...provided,
      border: "0.063rem solid #CBCBCB",
      backgroundColor: getStylesControl(state.isDisabled, isOpen),
      borderRadius: "0.5rem",
      paddingLeft: "0.2rem",
      width: "100%",
    }),
    container: (provided, state) => ({
      ...provided,
      flex: 1,
      width: "100%",
      borderColor: getStylesContainer(state.isFocused, state.isDisabled),
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isOpen ? "#FAFAFA" : "#CCCCCC",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#FAFAFA",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isOpen ? "#FAFAFA" : "#CCCCCC",
    }),
    input: (provided) => ({
      ...provided,
      color: isOpen ? "#FAFAFA" : "#CCCCCC",
    }),
  };

  return (
    <>
      {label && (
        <Text
          mode="label"
          htmlFor={id}
          className={twMerge("mb-4", labelClassName)}
        >
          {label}
        </Text>
      )}

      <ReactSelect
        inputId={id}
        instanceId={id}
        styles={customStyles}
        className="cursor-pointer"
        placeholder={texts.placeholder}
        components={{ DropdownIndicator }}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        onChange={(option: any) => onChange?.(option)}
        {...rest}
      />
    </>
  );
};

export { Select };
export type { Props as SelectProps };
