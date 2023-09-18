import { useEffect, useRef } from "preact/hooks";
import OdometerController from "odometer";

export const Odometer = (
  props:
    | {
        slug: string;
        update?: boolean;
      }
    | {
        data: number;
      }
) => {
  const odometerRef = useRef(null);

  useEffect(() => {
    // Initialize Odometer
    const odometerInstance = new OdometerController({
      el: odometerRef.current,
      value: 0, // Initial value
    });

    // If data is provided, update Odometer value
    if ("data" in props) {
      odometerInstance.update(props.data);
    } else {
      (async () => {
        const viewsAPI = await fetch(`/api/view/${props.slug}`, {
          method: props.update ? "POST" : "GET",
        });
        const { views } = await viewsAPI.json().catch(() => ({ views: 0 }));

        // Update Odometer value when `value` prop changes
        odometerInstance.update(views);
      })();
    }
  }, ["data" in props ? props.data : props.slug]);

  return <div ref={odometerRef} />;
};
