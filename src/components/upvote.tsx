import { useEffect, useRef, useState } from "preact/hooks";
import { Odometer } from "./odometer";

export const Upvote = ({ slug }: { slug: string }) => {
  // State for upvote count
  const [count, setCount] = useState(0);

  // Reference for upvote button
  const upvoteBtnRef = useRef<HTMLButtonElement>(null);

  // Check local storage for existing upvotes
  const checkUpvoted = () => {
    return localStorage.getItem(`upvoted-${slug}`) === "true";
  };

  // Fetch the initial upvote count on component mount
  useEffect(() => {
    fetch(`/api/upvote/${slug}`)
      .then((res) => res.json())
      .then((data) => setCount(data.upvotes ?? 0));
  }, [slug]);

  // Handle upvote action
  const handleUpvote = () => {
    // Mark as upvoted in local storage
    localStorage.setItem(`upvoted-${slug}`, "true");
    fetch(`/api/upvote/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.upvotes ?? 0);
      });
  };

  // Disable button if user has upvoted
  if (upvoteBtnRef.current) {
    upvoteBtnRef.current.disabled = checkUpvoted();
  }

  return (
    <div className="flex items-center">
      <button
        ref={upvoteBtnRef}
        onClick={handleUpvote}
        data-disabled={checkUpvoted()}
        className="rounded bg-neutral-800 px-2 py-1 font-bold text-white hover:bg-neutral-700 hover:cursor-pointer disabled:bg-neutral-900 disabled:hover:cursor-not-allowed"
      >
        Upvote
      </button>
      <span className="ml-2">
        <Odometer quantity={count} />
      </span>
    </div>
  );
};
