import { yearToRomanNumeral } from "../utils/romanNumeral";

interface CopyrightYearProps {
  year?: number;
}

export const CopyrightYear = ({ year = 2026 }: CopyrightYearProps) => {
  return (
    <p
      className="text-md font-bold tracking-[0.3em] text-paper-embossed"
      style={{
        textShadow:
          "1px 1px 2px rgba(255, 255, 255, 0.8), -2px -2px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      {yearToRomanNumeral(year)}
    </p>
  );
};
