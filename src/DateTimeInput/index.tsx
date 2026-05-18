"use client";
import { Input, type InputProps } from "@codegouvfr/react-dsfr/Input";
import Grid, { type GridBaseProps } from "@mui/material/Grid";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import clsx from "clsx";

type InputWithGridProps = InputProps.RegularInput & {
    gridProps?: GridBaseProps;
};

type DatetimeProps = {
    onChange?: (isoDate: string) => void;
    dateProps: InputWithGridProps;
    timeProps?: InputWithGridProps;
    withTime?: boolean;
    gridProps?: GridBaseProps;
};

export default function DateTimeInput({
    onChange = undefined,
    withTime = false,
    dateProps,
    timeProps = undefined,
    gridProps = undefined,
}: DatetimeProps) {
    // Détermine si le composant est contrôlé (value) ou non contrôlé (defaultValue)
    const isDateControlled = "value" in (dateProps.nativeInputProps ?? {});
    const isTimeControlled =
        withTime && "value" in (timeProps?.nativeInputProps ?? {});

    // Valeurs initiales en fonction de controlled/uncontrolled
    const [temporaryDate, setTemporaryDate] = useState(
        isDateControlled
            ? String(dateProps.nativeInputProps?.value ?? "")
            : String(dateProps.nativeInputProps?.defaultValue ?? ""),
    );
    const [temporaryTime, setTemporaryTime] = useState(
        isTimeControlled
            ? String(timeProps?.nativeInputProps?.value ?? "00:00")
            : String(timeProps?.nativeInputProps?.defaultValue ?? "00:00"),
    );

    // Synchronisation des valeurs externes vers les états locaux (uniquement si contrôlé)
    useEffect(() => {
        if (isDateControlled) {
            const externalDate = String(
                dateProps.nativeInputProps?.value ?? "",
            );
            setTemporaryDate(externalDate);
        }

        if (withTime && isTimeControlled) {
            const externalTime = String(
                timeProps?.nativeInputProps?.value ?? "00:00",
            );
            setTemporaryTime(externalTime);
        }
    }, [
        isDateControlled,
        isTimeControlled,
        dateProps.nativeInputProps?.value,
        withTime,
        timeProps?.nativeInputProps?.value,
    ]);

    function emitChange(nextDate: string, nextTime: string) {
        const isoDate = `${nextDate}T${nextTime}:00`;
        const dt = DateTime.fromISO(isoDate);

        if (dt.isValid) {
            onChange?.(dt.toISO());
        } else {
            setTemporaryDate("");
        }
    }

    // Destructuration des props pour éviter de transmettre `gridProps` à `Input`
    const { gridProps: dateGridProps, ...restDateProps } = dateProps;
    const { gridProps: timeGridProps, ...restTimeProps } = timeProps ?? {
        label: "",
    };

    return (
        <div className="fr-container fr-input-group fr-p-md-0">
            <Grid
                {...gridProps}
                container
                spacing={gridProps?.spacing ?? 2}
            >
                <Grid
                    {...dateGridProps}
                    size={dateGridProps?.size ?? "grow"}
                >
                    <Input
                        {...restDateProps}
                        className={clsx("fr-mb-0", dateProps.className)}
                        nativeInputProps={{
                            ...dateProps.nativeInputProps,
                            type: "date",
                            value: isDateControlled ? temporaryDate : undefined,
                            defaultValue: isDateControlled
                                ? undefined
                                : temporaryDate,
                            onChange: (event) => {
                                const newDate: string = event.target.value;
                                if (!isDateControlled) {
                                    setTemporaryDate(newDate);
                                }

                                emitChange(newDate, temporaryTime);
                                dateProps.nativeInputProps?.onChange?.(event);
                            },
                        }}
                    />
                </Grid>

                {withTime && timeProps && (
                    <Grid
                        {...timeGridProps}
                        size={timeGridProps?.size ?? "grow"}
                    >
                        <Input
                            {...restTimeProps}
                            nativeInputProps={{
                                ...timeProps.nativeInputProps,
                                type: "time",
                                value: isTimeControlled
                                    ? temporaryTime
                                    : undefined,
                                defaultValue: isTimeControlled
                                    ? undefined
                                    : temporaryTime,
                                onChange: (event) => {
                                    const newTime: string = event.target.value;
                                    if (!isTimeControlled) {
                                        setTemporaryTime(newTime);
                                    }

                                    emitChange(temporaryDate, newTime);
                                    timeProps.nativeInputProps?.onChange?.(
                                        event,
                                    );
                                },
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
