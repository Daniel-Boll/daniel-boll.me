export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "BloomCG",
    techs: ["C++", "OpenGL", "xmake"],
    link: "https://github.com/Daniel-Boll/BloomCG-xmake",
  },
  {
    title: "Pile Lang",
    techs: ["Rust", "Parser Combinators", "LLVM", "WebAssembly"],
    link: "https://github.com/pile-lang/rusted-pile",
  },
  {
    title: "Foliage Recognition",
    techs: ["Python", "Scikit-Learn", "OpenCV"],
    link: "https://github.com/Daniel-Boll/foliage-finder",
    isComingSoon: true,
  },
  {
    title: "Packet Racers",
    techs: ["Rust", "Tokyo", "Socket"],
    link: "https://github.com/packet-racers/cli",
  },
].sort((a, b) => a.title.localeCompare(b.title))
.sort((a, b) => {
  if (a.isComingSoon && !b.isComingSoon) return 1;
  if (!a.isComingSoon && b.isComingSoon) return -1;
  return 0;
});

export default projects;
