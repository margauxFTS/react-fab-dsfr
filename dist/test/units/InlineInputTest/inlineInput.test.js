import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { InlineInput } from "@/src/InlineInput";
jest.mock("@codegouvfr/react-dsfr/Input", () => ({
    __esModule: true,
    default: ({ nativeInputProps, disabled, }) => (_jsx("input", { ...nativeInputProps, disabled: disabled })),
}));
describe("InlineInput", () => {
    function setup(propsOverride = {}) {
        const onChange = jest.fn();
        const props = {
            label: "Name",
            value: "John",
            name: "name",
            onChange,
            ...propsOverride,
        };
        render(_jsx(InlineInput, { ...props }));
        return { onChange };
    }
    it("renders label and initial value", () => {
        setup();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    });
    it("input is disabled by default (not modifying)", () => {
        setup();
        const input = screen.getByDisplayValue("John");
        expect(input).toBeDisabled();
    });
    it("enables input after clicking Modify", () => {
        setup();
        fireEvent.click(screen.getByTitle("Modifier"));
        const input = screen.getByDisplayValue("John");
        expect(input).toBeEnabled();
    });
    it("updates input value when typing", () => {
        setup();
        fireEvent.click(screen.getByTitle("Modifier"));
        const input = screen.getByDisplayValue("John");
        fireEvent.change(input, { target: { value: "Jane" } });
        expect(input).toHaveValue("Jane");
    });
    it("calls onChange with new value on Save", () => {
        const { onChange } = setup();
        fireEvent.click(screen.getByTitle("Modifier"));
        const input = screen.getByDisplayValue("John");
        fireEvent.change(input, { target: { value: "Jane" } });
        fireEvent.click(screen.getByTitle("Enregistrer"));
        expect(onChange).toHaveBeenCalledWith("Jane");
    });
    it("resets value when re-entering modify mode", () => {
        setup();
        fireEvent.click(screen.getByTitle("Modifier"));
        const input = screen.getByDisplayValue("John");
        fireEvent.change(input, { target: { value: "Jane" } });
        fireEvent.click(screen.getByTitle("Annuler"));
        fireEvent.click(screen.getByTitle("Modifier"));
        expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    });
    it("does not render buttons when editable=false", () => {
        setup({ editable: false });
        expect(screen.queryByTitle("Modifier")).not.toBeInTheDocument();
    });
    it("disables everything when disabled=true", () => {
        setup({ disabled: true });
        const modifyButton = screen.getByTitle("Modifier");
        expect(modifyButton).toBeDisabled();
    });
});
//# sourceMappingURL=inlineInput.test.js.map