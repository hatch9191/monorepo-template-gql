import { type ColourToken, colours, radius } from "@repo/tokens";

const colourNames: Record<ColourToken, string> = {
  background: "background",
  foreground: "foreground",
  card: "card",
  cardForeground: "card-foreground",
  primary: "primary",
  primaryForeground: "primary-foreground",
  secondary: "secondary",
  secondaryForeground: "secondary-foreground",
  muted: "muted",
  mutedForeground: "muted-foreground",
  accent: "accent",
  accentForeground: "accent-foreground",
  destructive: "destructive",
  border: "border",
  input: "input",
  ring: "ring",
};

export function buildThemeCss(): string {
  const rootLines = Object.entries(colourNames).map(([token, cssName]) => {
    return `  --${cssName}: ${colours[token as ColourToken]};`;
  });
  const themeLines = Object.values(colourNames).map((cssName) => {
    return `  --color-${cssName}: var(--${cssName});`;
  });

  return `:root {\n${rootLines.join("\n")}\n  --radius: ${radius};\n}\n\n@theme inline {\n${themeLines.join("\n")}\n  --radius-sm: calc(var(--radius) - 4px);\n  --radius-md: calc(var(--radius) - 2px);\n  --radius-lg: var(--radius);\n  --radius-xl: calc(var(--radius) + 4px);\n}\n`;
}
