import { useEffect, useRef } from "preact/hooks";
import OdometerController from "odometer";

export const Odometer = ({ quantity }: { quantity: number }) => {
  const odometerRef = useRef(null);

  useEffect(() => {
    // Initialize Odometer
    const odometerInstance = new OdometerController({
      el: odometerRef.current,
      value: 0, // Initial value
    });

    // Update Odometer value when `value` prop changes
    odometerInstance.update(quantity);
  }, [quantity]);

  return <div ref={odometerRef} />;
};
