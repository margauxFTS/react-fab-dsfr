/* eslint-disable react/no-multi-comp */
"use client";

import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import {
  Autocomplete as MuiAutocomplete,
  type AutocompleteProps as MuiAutocompleteProps,
  type AutocompleteRenderInputParams as MuiAutocompleteRenderInputParams,
} from "@mui/material";
import { useId } from "react";

import clsx from "clsx";

export type AutocompleteOption = { id: string; label: string };
export type AutocompleteItem = AutocompleteOption | string;

export type AutocompleteValue = AutocompleteItem[] | AutocompleteItem | null;

type AutoCompleteProps<ValueType> = InputProps.RegularInput & {
  nativeAutocompleteProps: Omit<
    MuiAutocompleteProps<ValueType, boolean, boolean, boolean>,
    "renderInput"
  >;
};

export function extractAutocompleteValue(
  value: AutocompleteValue,
): AutocompleteOption | null {
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    const firstValid = value.find(
      (item): item is AutocompleteOption =>
        typeof item !== "string" && "id" in item,
    );
    return firstValid ?? null;
  }
  if (typeof value === "string") {
    return null;
  }
  return value;
}

function AutoCompleteRenderInput(
  params: MuiAutocompleteRenderInputParams,
  nativeInputProps?: InputProps.RegularInput["nativeInputProps"],
) {
  const { slotProps } = params;

  return (
    <div ref={slotProps.input.ref}>
      <input
        {...nativeInputProps}
        {...slotProps.htmlInput}
        className={clsx(nativeInputProps?.className, "fr-input", "fr-mt-md-2v")}
        placeholder={nativeInputProps?.placeholder}
      />
    </div>
  );
}

export function AutoComplete<ValueType>({
  className,
  label,
  nativeInputProps,
  nativeAutocompleteProps,
  state,
  stateRelatedMessage,
}: AutoCompleteProps<ValueType>) {
  const autocompleteID = useId();

  return (
    <div
      className={clsx(
        className,
        "fr-input-group",
        state === "error" && "fr-input-group--error",
      )}
    >
      {label !== null && (
        <label className="fr-label" htmlFor={autocompleteID}>
          {label}
        </label>
      )}
      <MuiAutocomplete
        {...nativeAutocompleteProps}
        id={autocompleteID}
        renderInput={(params) =>
          AutoCompleteRenderInput(params, nativeInputProps)
        }
      />
      {state === "error" && (
        <p className="fr-error-text">{stateRelatedMessage}</p>
      )}
    </div>
  );
}
