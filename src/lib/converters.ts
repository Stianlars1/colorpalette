export function extractColorValues(colorStr: string) {
  // Extract everything inside the parentheses
  const match = colorStr.match(/\(([^)]+)\)/);
  if (!match) return "";

  // Replace commas with spaces and trim extra whitespace
  return match[1].replace(/,/g, " ").trim();
}
