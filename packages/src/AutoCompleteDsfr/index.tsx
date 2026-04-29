/* eslint-disable react/no-multi-comp */
"use client";

import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import {
    Autocomplete,
    type AutocompleteProps,
    type AutocompleteRenderInputParams,
} from "@mui/material";
import { useId } from "react";

import clsx from "clsx";

export type AutoCompleteValue = { id: string; label: string };

export type AutocompleteDsfrValue =
    | (AutoCompleteValue | string)[]
    | NonNullable<AutoCompleteValue | string>
    | null;

type AutoCompleteDsfrProps<ValueType> = InputProps.RegularInput & {
    nativeAutocompleteProps: Omit<
        AutocompleteProps<ValueType, boolean, boolean, boolean>,
        "renderInput"
    >;
};

export function extractAutocompleteValue(
    value: AutocompleteDsfrValue,
): { id: string; label: string } | null {
    if (value === null) {
        return null;
    }
    if (Array.isArray(value)) {
        // On filtre pour ne garder que les objets avec `id`
        const firstValid = value.find(
            (item): item is { id: string; label: string } =>
                typeof item !== "string" && "id" in item,
        );
        return firstValid ?? null;
    }
    if (typeof value === "string") {
        return null;
    }
    return value;
}

export function AutoCompleteRenderInputDsfr(
    params: AutocompleteRenderInputParams,
    nativeInputProps?: InputProps.RegularInput["nativeInputProps"],
) {
    const { slotProps } = params;

    return (
        <div ref={slotProps.input.ref}>
            <input
                {...nativeInputProps}
                {...slotProps.htmlInput}
                className={clsx(
                    nativeInputProps?.className,
                    "fr-input",
                    "fr-mt-md-2v",
                )}
                placeholder={nativeInputProps?.placeholder}
            />
        </div>
    );
}

export function AutoCompleteDsfr<ValueType>({
    className,
    label,
    nativeInputProps,
    nativeAutocompleteProps,
    state,
    stateRelatedMessage,
}: AutoCompleteDsfrProps<ValueType>) {
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
                <label
                    className="fr-label"
                    htmlFor={autocompleteID}
                >
                    {label}
                </label>
            )}
            <Autocomplete
                {...nativeAutocompleteProps}
                id={autocompleteID}
                renderInput={(params) =>
                    AutoCompleteRenderInputDsfr(params, nativeInputProps)
                }
            />
            {state === "error" && (
                <p className="fr-error-text">{stateRelatedMessage}</p>
            )}
        </div>
    );
}
