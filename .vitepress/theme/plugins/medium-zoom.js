import mediumZoom from "medium-zoom";

export default () => {
  mediumZoom(".vp-doc img", {
    background: "var(--vp-c-bg)",
  });
};
