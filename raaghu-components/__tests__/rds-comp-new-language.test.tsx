import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompNewLanguage from "../src/rds-comp-new-language/rds-comp-new-language";

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));

describe("RdsCompNewLanguage", () => {
  const mockCultureList = [
    { option: "English", value: "en-US" },
    { option: "French", value: "fr-FR" },
    // Add other culture items as needed
  ];

  const mockFlagIconList = [
    { option: "Flag 1", value: "flag1" },
    { option: "Flag 2", value: "flag2" },
    // Add other flag icon items as needed
  ];

  const mockSaveHandler = jest.fn();

  it("renders the component", () => {
    render(
      <RdsCompNewLanguage
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={mockSaveHandler}
        isEnabled={true}
      />
    );
    // Component Render on Successfully
  });

  it('renders with required props', () => {
    render(
        <RdsCompNewLanguage
          cultureList={mockCultureList}
          flagIconList={mockFlagIconList}
          onSaveHandler={mockSaveHandler}
          isEnabled={true}
        />
      );
    
    // Add your assertions based on the rendered component
    expect(screen.getByText(/LanguageManagement.CultureName/i)).toBeInTheDocument();
    expect(screen.getByText(/LanguageManagement.UiCultureName/i)).toBeInTheDocument();
    expect(screen.getByText(/LanguageManagement.DisplayName/i)).toBeInTheDocument();
    expect(screen.getByText(/Is Enabled/i)).toBeInTheDocument();
    expect(screen.getByText(/LanguageManagement.FlagIcon/i)).toBeInTheDocument();
    expect(screen.getByText(/AbpUi.Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/AbpUi.Save/i)).toBeInTheDocument();
  });
});