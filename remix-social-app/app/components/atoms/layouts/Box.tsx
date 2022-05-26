import { styled } from "~/styles/stitches.config";

const Box = styled("div", {
  variants: {
    type: {
      vstack: {
        display: "flex",
        flexDirection: "column",
      },
      hstack: {
        display: "flex",
        flexDirection: "row",
      },
    },
    position: {
      allCenter: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

export default Box;
