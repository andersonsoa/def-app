import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Input } from "./index";

describe("Input.tsx", () => {
  it("should render an label", () => {
    const expectedLabel = "E-Mail";

    render(<Input label={expectedLabel} />);

    expect(screen.getByText(expectedLabel)).toBeDefined();
  });

  it("should render a value", () => {
    const expectedValue = "example@mail.com";

    render(<Input label="Test" value={expectedValue} />);

    const element = screen.getByTestId<HTMLInputElement>("input");

    expect(element.value).toBe(expectedValue);
  });

  it("should contain an error message", () => {
    const expectedErrorMessage = "E-Mail Incorreto";

    render(<Input label="Test" errorMessage={expectedErrorMessage} />);

    expect(screen.getByText(expectedErrorMessage)).toBeDefined();
  });
});
