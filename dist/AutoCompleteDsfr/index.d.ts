import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import { type AutocompleteProps, type AutocompleteRenderInputParams } from "@mui/material";
export type AutoCompleteValue = {
    id: string;
    label: string;
};
export type AutocompleteDsfrValue = (AutoCompleteValue | string)[] | NonNullable<AutoCompleteValue | string> | null;
type AutoCompleteDsfrProps<ValueType> = InputProps.RegularInput & {
    nativeAutocompleteProps: Omit<AutocompleteProps<ValueType, boolean, boolean, boolean>, "renderInput">;
};
export declare function extractAutocompleteValue(value: AutocompleteDsfrValue): {
    id: string;
    label: string;
} | null;
export declare function AutoCompleteRenderInputDsfr(params: AutocompleteRenderInputParams, nativeInputProps?: InputProps.RegularInput["nativeInputProps"]): import("react/jsx-runtime").JSX.Element;
export declare function AutoCompleteDsfr<ValueType>({ className, label, nativeInputProps, nativeAutocompleteProps, state, stateRelatedMessage, }: AutoCompleteDsfrProps<ValueType>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map