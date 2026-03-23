import mediumZoom from "medium-zoom";

export default () => {
  mediumZoom(".vp-doc img:not(.vp-tabs__nav img)", {
    background: "var(--vp-c-bg)",
  });
};
