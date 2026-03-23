export default [
  { text: "Home", link: "/" },
  {
    text: "Operating system",
    activeMatch: "/operating-system-software/",
    items: [
      {
        text: "System software",
        link: "/software/system",
      },
      {
        text: "Network software",
        link: "/software/network",
      },
    ],
  },
  {
    text: "Internet",
    activeMatch: "/internet-software/",
    items: [
      {
        text: "Educational",
        link: "/software/educational/",
      },
      {
        text: "Social media",
        link: "/software/social-media",
      },
      {
        text: "Video game",
        link: "/software/video-game",
      },
      {
        text: "Productivity",
        link: "/software/productivity",
      },
    ],
  },
  {
    text: "File",
    activeMatch: "/file-software/",
    items: [
      {
        text: "Text",
        link: "/software/text",
      },
      {
        text: "Graphics",
        link: "/software/graphics",
      },
      {
        text: "Audio",
        link: "/software/audio",
      },
      {
        text: "Video",
        link: "/software/video",
      },
    ],
  },
  {
    text: "Changelog",
    link: "/changelog",
  },
  {
    text: "Bulletin board",
    link: "/bulletin-board",
  },
];
