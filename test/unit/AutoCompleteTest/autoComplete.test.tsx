/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import {
    AutoComplete,
    type AutocompleteValue,
    extractAutocompleteValue,
} from "@/src/AutoComplete/index";

jest.mock("clsx", () => jest.fn(() => "mock-clsx"));

describe("AutoCompleteDsfr", () => {
    const mockOptions: AutocompleteValue[] = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
    ];

    function setup(propsOverride = {}) {
        render(
            <AutoComplete
                label="Test Label"
                nativeAutocompleteProps={{
                    options: mockOptions,
                    value: null,
                    onChange: jest.fn(),
                }}
                {...propsOverride}
            />,
        );
    }

    it("doit rendre l'autocomplete avec les options", () => {
        setup();
        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("doit extraire la valeur autocomplete correctement", () => {
        const value: AutocompleteValue = { id: "1", label: "Option 1" };

        expect(extractAutocompleteValue(value)).toEqual(value);
        expect(extractAutocompleteValue(null)).toBeNull();
        expect(extractAutocompleteValue("string")).toBeNull();
        expect(extractAutocompleteValue([value, "string"])).toEqual(value);
        expect(extractAutocompleteValue(["string", "autre"])).toBeNull();
    });

    it("doit afficher un message d'erreur", () => {
        setup({
            state: "error",
            stateRelatedMessage: "Error message",
        })
        expect(screen.getByText("Error message")).toBeInTheDocument();
    });
});