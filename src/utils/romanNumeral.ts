/**
 * Converts a year (regular number) to Roman numerals
 * @param year - A positive integer representing a year
 * @returns Roman numeral representation of the year
 */
export function yearToRomanNumeral(year: number): string {
  const romanMap: Array<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  let remaining = year;

  for (const [value, numeral] of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}
