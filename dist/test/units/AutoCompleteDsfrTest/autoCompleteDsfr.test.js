import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AutoCompleteDsfr, extractAutocompleteValue, } from "@/src/AutoCompleteDsfr/index";
jest.mock("@/app/lib/clsx", () => jest.fn(() => "mock-clsx"));
describe("AutoCompleteDsfr", () => {
    const mockOptions = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
    ];
    it("doit rendre l'autocomplete avec les options", () => {
        render(_jsx(AutoCompleteDsfr, { label: "Test Label", nativeAutocompleteProps: {
                options: mockOptions,
                value: null,
                onChange: jest.fn(),
            } }));
        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
    it("doit extraire la valeur autocomplete correctement", () => {
        const value = { id: "1", label: "Option 1" };
        expect(extractAutocompleteValue(value)).toEqual(value);
        expect(extractAutocompleteValue(null)).toBeNull();
        expect(extractAutocompleteValue("string")).toBeNull();
        expect(extractAutocompleteValue([value, "string"])).toEqual(value);
    });
});
//# sourceMappingURL=autoCompleteDsfr.test.js.map