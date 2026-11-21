import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Typography system — self-hosted by next/font (no layout shift, no
 * third-party requests at runtime).
 *
 * - Display: Bricolage Grotesque — headlines. The optical-size axis keeps
 *   large settings tight and refined.
 * - Sans: Instrument Sans — body copy and interface text.
 * - Mono: JetBrains Mono — labels, data and technical annotations.
 */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bricolage",
});

export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const fontVariables = [fontDisplay.variable, fontSans.variable, fontMono.variable].join(" ");
