const IMAGE_PATHS = {
  "JBL Tune": require("../assets/jbl.png"),
  "Sony Zx": require("../assets/sony.png"),
  "Jabra Evolve": require("../assets/jabra.png"),
};

export const collection = [
  {
    img: IMAGE_PATHS["JBL Tune"],
    title: "JBL Tune",
    subtitle: "$40",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: IMAGE_PATHS["Sony Zx"],
    title: "Sony Zx",
    subtitle: "$50",
  },
  {
    img: IMAGE_PATHS["Jabra Evolve"],
    title: "Jabra Evolve",
    subtitle: "$30",
  },
];
