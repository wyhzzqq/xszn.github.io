export default [
  { text: "首页", link: "/" },
  {
    text: "操作系统软件",
    activeMatch: "/operating-system-software/",
    items: [
      {
        text: "系统软件",
        link: "/software/system",
      },
      {
        text: "网络软件",
        link: "/software/network",
      },
    ],
  },
  {
    text: "互联网软件",
    activeMatch: "/internet-software/",
    items: [
      {
        text: "教育软件",
        link: "/software/educational/",
      },
      {
        text: "社交媒体软件",
        link: "/software/social-media",
      },
      {
        text: "电子游戏软件",
        link: "/software/video-game",
      },
      {
        text: "生产力软件",
        link: "/software/productivity",
      },
    ],
  },
  {
    text: "文件软件",
    activeMatch: "/file-software/",
    items: [
      {
        text: "文本软件",
        link: "/software/text",
      },
      {
        text: "图像软件",
        link: "/software/graphics",
      },
      {
        text: "音频软件",
        link: "/software/audio",
      },
      {
        text: "视频软件",
        link: "/software/video",
      },
    ],
  },
  {
    text: "更新日志",
    link: "/changelog",
  },
  {
    text: "留言板",
    link: "/bulletin-board",
  },
];
