import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { styled, theme } from "~/styles/stitches.config";

export const Checkbox = styled(RadixCheckbox.Root, {
  all: "unset",
  backgroundColor: theme.colors.white,
  width: 20,
  height: 20,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 0 0 1px ${theme.colors.gray7}`,
  "&:hover": { backgroundColor: theme.colors.violet3 },
  "&:focus": { boxShadow: `0 0 0 2px ${theme.colors.violet8}` },
});

export const CheckboxIndicator = styled(RadixCheckbox.Indicator, {
  color: theme.colors.violet10,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
