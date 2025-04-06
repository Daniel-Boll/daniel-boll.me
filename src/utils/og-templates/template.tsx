export interface OgData {
  title: string;
  description: string;
  date: Date;
  tags?: string[];
}

export const OpenGraphTemplate = ({
  title,
  description,
  date,
  tags,
}: OgData) => {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
        padding: "10px 20px",
        fontFamily: "monospace, sans-serif",
        fontSize: 28,
        backgroundColor: "rgb(10 10 10)",
      },
      children: [
        {
          type: "p",
          props: {
            style: {
              color: "rgb(229 62 62)",
            },
            children: "ダーニエル",
          },
        },
        {
          type: "h2",
          props: {
            style: {
              color: "white",
              alignSelf: "center",
              fontSize: "25px",
            },
            children: title,
          },
        },
        {
          type: "p",
          props: {
            style: {
              color: "grey",
              alignSelf: "center",
              fontSize: "18px",
            },
            children: description,
          },
        },
        {
          type: "p",
          props: {
            style: {
              color: "white",
              fontSize: "12px",
            },
            children: date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            }),
          },
        },
      ],
    },
  };
};
