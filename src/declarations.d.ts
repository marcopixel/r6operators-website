// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

declare module "*.png";
declare module "*.jpg";
declare module "*.svg" {
    const content: any;
    export default content;
};
declare module "*.json" {
    const value: any;
    export default value;
};
declare module "react-dropdown" {
    export interface ReactDropdownProps {
      options: any;
      baseClassName?: string;
      className?: string;
      controlClassName?: string;
      placeholderClassName?: string;
      menuClassName?: string;
      arrowClassName?: string;
      disabled?: boolean;
      onChange?: (arg: Option) => void;
      onFocus?: (arg: boolean) => void;
      value?: Option | string;
      placeholder?: String;
    }
    export default ReactDropdownProps
  }
