import type { FrIconClassName, RiIconClassName } from "@codegouvfr/react-dsfr";
import { type InputProps } from "@codegouvfr/react-dsfr/Input";
import { type GridSize } from "@mui/material";
import { type ReactNode } from "react";
import { type InlineEditSaveCancelButtonsProps } from "../InlineSaveCancelButtons/index.js";
type InlineInputProps = {
    label: ReactNode;
    value: string;
    name: string;
    fieldSize?: GridSize;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: string) => void;
    editable?: boolean;
    disabled?: boolean;
    alertIcon?: FrIconClassName | RiIconClassName;
    nativeButtonsProps?: InlineEditSaveCancelButtonsProps;
    nativeInputProps?: InputProps.RegularInput["nativeInputProps"];
};
export declare function InlineInput({ label, value, name, fieldSize, onChange, editable, disabled, alertIcon, nativeButtonsProps, nativeInputProps, }: InlineInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map