/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import DateTimeInput from "@/src/DateTimeInput/index";

jest.mock("@codegouvfr/react-dsfr/Input", () => ({
    __esModule: true,
    Input: ({
        nativeInputProps,
    }: {
        nativeInputProps: React.InputHTMLAttributes<HTMLInputElement>;
    }) => {
        const { value, defaultValue, ...rest } = nativeInputProps;

        return(
            <input
                {...rest}
                {...(value !== undefined ? { value } : { defaultValue })}
            />
        );  
    },
}));

describe("DateTimeInput", () => {
    
    function setup(props?: {
        onChange?: jest.Mock;
        withTime?: boolean;
        dateValue?: string;
        timeValue?: string;
        dateDefaultValue?: string;
        timeDefaultValue?: string;
    }) {
        const onChange = props?.onChange ?? jest.fn();
        
        const isControlled = props?.dateValue !== undefined;
    
        render(
            <DateTimeInput
                onChange={onChange}
                withTime={props?.withTime ?? false}
                dateProps={{
                    label: "Date",
                    nativeInputProps: isControlled
                        ? { value: props?.dateValue ?? "2026-05-13" }
                        : { defaultValue: props?.dateDefaultValue ?? "2026-05-13" },
                }}
                timeProps={
                    props?.withTime
                        ? {
                              label: "Heure",
                              nativeInputProps: isControlled
                                  ? { value: props?.timeValue ?? "12:00" }
                                  : { defaultValue: props?.timeDefaultValue ?? "12:00" },
                          }
                        : undefined
                }
            />
        );
    
        return{onChange};
    }


    describe("rendu initial", () => {

        it("affiche la date en mode contrôlé et masque l'heure si withTime est false", () => {
            setup({ dateValue: "2026-05-13", withTime: false });
            expect(screen.getByDisplayValue("2026-05-13")).toBeInTheDocument();
            expect(screen.queryByDisplayValue("12:00")).not.toBeInTheDocument();
        })

        it("affiche la date en mode contrôlé et masque l'heure si withTime est false", () => {
            setup({ dateDefaultValue: "2026-05-13", withTime: false });
            expect(screen.getByDisplayValue("2026-05-13")).toBeInTheDocument();
            expect(screen.queryByDisplayValue("12:00")).not.toBeInTheDocument();
        })


        it("affiche l'heure quand withTime est true", () => {
            setup({ dateValue: "2026-05-13", withTime: true, timeValue: "12:00" });
            expect(screen.getByDisplayValue("12:00")).toBeInTheDocument();
        })

        it("affiche la date et l'heure à vide et 00:00 si les valeurs ne sont pas fournies", () => {
            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime
                    dateProps={{
                        label: "Date",
                        nativeInputProps: {},
                    }}
                    timeProps={{
                        label: "Heure",
                        nativeInputProps: {},
                    }}
                />
            );

            expect(screen.getByDisplayValue("")).toBeInTheDocument();
            expect(screen.getByDisplayValue("00:00")).toBeInTheDocument();
        });

        it("doit afficher les valeurs de repli si les valeurs contrôlées sont vides", () => {
            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime
                    dateProps={{
                        label: "Date",
                        nativeInputProps: { value: undefined },
                    }}
                    timeProps={{
                        label: "Heure",
                        nativeInputProps: { value: undefined },
                    }}
                />
            );

            expect(screen.getByDisplayValue("")).toBeInTheDocument();
            expect(screen.getByDisplayValue("00:00")).toBeInTheDocument();
        });

        it("champ heure n'est pas rendu si withTime=true mais sans timeProps", () => {
            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime
                    dateProps={{
                        label: "Date",
                        nativeInputProps: {value: "2026-05-13"},
                    }}
                />
            
            );
            expect(screen.queryByDisplayValue("00:00")).not.toBeInTheDocument();
        });

        it("ne plante pas si nativeInputProps est undefined", () => {
            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime={false}
                    dateProps={{
                        label: "Date",
                    }}
        
                />
            );

            expect(screen.getByDisplayValue("")).toBeInTheDocument();
        });

    });

    describe("onChange", () => {

        it("doit changer la date lors d'un changement de date (mode contrôlé)", () => {
            const { onChange } = setup({ dateValue: "2026-05-13", withTime: true, timeValue: "12:00" });

            fireEvent.change(screen.getByDisplayValue("2026-05-13"), {target: { value: "2026-06-14" }});
            expect(onChange).toHaveBeenCalledWith(expect.stringContaining("2026-06-14T12:00"));

        });

         it("doit changer l'heure lors d'un changement d'heure (mode contrôlé)", () => {
            const { onChange } = setup({ dateValue: "2026-05-13", withTime: true, timeValue: "12:00" });

            fireEvent.change(screen.getByDisplayValue("12:00"), {target: { value: "14:30" }});
            expect(onChange).toHaveBeenCalledWith( expect.stringContaining("2026-05-13T14:30"));
        });

        it("doit changer la date lors d'un changement de date (mode non contrôlé)", () => {
            const { onChange } = setup({ dateDefaultValue: "2026-05-13", withTime: true, timeDefaultValue: "12:00" })
            
            fireEvent.change(screen.getByDisplayValue("2026-05-13"), { target: { value: "2026-06-14" }});
            expect(onChange).toHaveBeenCalledWith( expect.stringContaining("2026-06-14T12:00")  );
        
        });

        it("doit changer l'heure lors d'un changement d'heure (mode non contrôlé)", () => {
            const { onChange } = setup({ dateDefaultValue: "2026-05-13", withTime: true, timeDefaultValue: "12:00" })

            fireEvent.change(screen.getByDisplayValue("12:00"), { target: { value: "14:30" }});
            expect(onChange).toHaveBeenCalledWith( expect.stringContaining("2026-05-13T14:30") );
       
        });    

        it("n'appelle pas onChange si la date est invalide", () => {
            const { onChange } = setup({ dateValue: "2026-05-13", withTime: true, timeValue: "12:00" });

            fireEvent.change(screen.getByDisplayValue("2026-05-13"), { target: { value: "invalide" }});
            expect(onChange).not.toHaveBeenCalled();
        });


        it("appelle les onChange natif de dateProps et timeProps si fournis", () => {
            const nativeDateOnChange = jest.fn();
            const nativeTimeOnChange = jest.fn();

            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime
                    dateProps={{
                        label: "Date",
                        nativeInputProps: { value: "2026-05-13", onChange: nativeDateOnChange },
                    }}
                    timeProps={{
                        label: "Heure",
                        nativeInputProps: { value: "12:00", onChange: nativeTimeOnChange },
                    }}
                />
            );

            fireEvent.change(screen.getByDisplayValue("12:00"),{ target: { value: "14:45" } });
            expect(nativeTimeOnChange).toHaveBeenCalled();

            fireEvent.change(screen.getByDisplayValue("2026-05-13"), { target: { value: "2026-06-14" } });
            expect(nativeDateOnChange).toHaveBeenCalled();
        });

    }); 
    
    describe("mise en page gridProps", () => {

        it("utilise les gridProps et size pour date et heure", () => { 
            render(
                <DateTimeInput
                    onChange={jest.fn()}
                    withTime
                    gridProps={{ spacing: 4}}
                    dateProps={{
                        label: "Date",
                        nativeInputProps: { value: "2026-05-13" },
                        gridProps: { size: 6 },
                    }}
                    timeProps={{
                        label: "Heure",
                        nativeInputProps: { value: "12:00" },
                        gridProps: { size:4 },
                    }}
                />
            );

            expect(screen.getByDisplayValue("2026-05-13")).toBeInTheDocument();
            expect(screen.getByDisplayValue("12:00")).toBeInTheDocument();

        })
    });
});