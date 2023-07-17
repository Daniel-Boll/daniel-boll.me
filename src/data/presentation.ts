type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
};

const presentation: Presentation = {
  mail: "danielboll.dev@proton.me",
  title: "Hi, I’m <Daniel::Boll> 👋",
  description:
    "*Salve!* I'm a full-stack developer from Brazil. I'm passionate about technology and constantly seeking new challenges to expand my skillset. I enjoy mastering new programming languages and frameworks and contributing to open source projects. I also like sharing my progress through live coding.",
  socials: [
    {
      label: "Twitter",
      link: "https://twitter.com/db_regret",
    },
    {
      label: "Github",
      link: "https://github.com/daniel-boll",
    },
  ],
};

export default presentation;
