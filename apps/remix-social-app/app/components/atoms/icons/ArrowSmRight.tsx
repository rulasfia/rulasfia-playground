import type { CSS } from "@stitches/react";
import type { config } from "~/styles/stitches.config";
import { styled } from "~/styles/stitches.config";

interface Props {
  css?: CSS<typeof config>;
}

const SVG = styled("svg");

export default function ArrowNarrowRight({ css }: Props) {
  return (
    <SVG
      css={css}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </SVG>
  );
}
