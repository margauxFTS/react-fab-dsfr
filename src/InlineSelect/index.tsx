"use client";
import Select, { type SelectProps } from "@codegouvfr/react-dsfr/SelectNext";
import { Grid, type GridSize } from "@mui/material";
import { type ChangeEvent, type ReactNode, useState } from "react";

import {
    InlineEditSaveCancelButtons,
    type InlineEditSaveCancelButtonsProps,
} from "../InlineSaveCancelButtons/index";

type InlineSelectProps = {
    label: ReactNode;
    value: SelectProps.Option;
    options: SelectProps.Option[];
    name: string;
    fieldSize?: GridSize;
    onChange?: (newValue: string | null) => void;
    editable?: boolean;
    disabled?: boolean;
    nativeButtonsProps?: InlineEditSaveCancelButtonsProps;
};

export function InlineSelect({
    label,
    value,
    options,
    name,
    fieldSize = "auto",
    onChange = undefined,
    editable = true,
    disabled = false,
    nativeButtonsProps = undefined,
}: InlineSelectProps) {
    const [modifiying, setModifiying] = useState(false);
    const [edition, setEdition] = useState(value);

    function onModify() {
        setEdition(value);
    }

    function onSave() {
        if (onChange) {
            onChange(edition.value === "" ? null : edition.value);
        }
    }

    return (
        <Grid
            container
            spacing={0}
        >
            <Grid size={2}>{label}</Grid>
            <Grid size={fieldSize}>
                <Select
                    disabled={!modifiying || disabled}
                    label=""
                    nativeSelectProps={{
                        name,
                        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
                            const rawValue = event.target.value;
                            const option = options.find(
                                (opt) => opt.value === rawValue,
                            );
                            if (option) {
                                setEdition(option);
                            }
                        },
                        value: edition.value,
                    }}
                    options={options}
                />
            </Grid>

            <Grid size={2}>
                {editable && options.length > 0 && (
                    <InlineEditSaveCancelButtons
                        {...nativeButtonsProps}
                        disabled={disabled}
                        modifying={modifiying}
                        onModify={onModify}
                        onSave={onSave}
                        setModifying={setModifiying}
                    />
                )}
            </Grid>
        </Grid>
    );
}
