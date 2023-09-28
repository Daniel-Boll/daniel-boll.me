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
}: OgData) => (
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
        fontSize: "25px",
      }}
    >
      {title}
    </h2>
    <p
      style={{
        color: "grey",
        alignSelf: "center",
        fontSize: "18px",
      }}
    >
      {description}
    </p>
    {tags && tags.length > 0 && (
      <ul
        style={{
          color: "white",
          display: "flex",
          gap: "8",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {tags.map((tag) => (
          <li
            style={{
              backgroundColor: "grey",
              borderRadius: "18px",
              padding: "4px",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tag}
          </li>
        ))}
      </ul>
    )}
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
