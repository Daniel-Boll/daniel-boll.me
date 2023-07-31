export interface OgData {
  title: string;
  description: string;
  date: Date;
}

export const OpenGraphTemplate = ({ title, description, date }: OgData) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "100%",
      width: "100%",
      padding: "10px 20px",
      fontFamily: "JetBrainsMono-Bold, monospace, Noto Sans JP, sans-serif",
      fontSize: 28,
      backgroundColor: "rgb(10 10 10)",
    }}
  >
    <p
      style={{
        color: "rgb(229 62 62)",
      }}
    >
      ダーニエル
    </p>
    <h2
      style={{
        color: "white",
        alignSelf: "center",
        margin: 0,
        fontSize: "",
      }}
    >
      {title}
    </h2>
    <p
      style={{
        color: "grey",
        alignSelf: "center",
        fontSize: "20px",
      }}
    >
      {description}
    </p>
    <p style={{ color: "white", fontSize: "12px" }}>
      {date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })}
    </p>
  </div>
);
