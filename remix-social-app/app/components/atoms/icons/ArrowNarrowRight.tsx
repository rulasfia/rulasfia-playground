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
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </SVG>
  );
}
