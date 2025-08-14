import { useEffect, useState } from "react";

const Button = ({
  label,
  handleClick,
  color = "yambrownbutton",
  isSubmitting = false,
  className = "",
}) => {
  const [customColorClass, setCustomColorClass] = useState("");

  useEffect(() => {
  // Avoid dynamic class names Tailwind can’t see. Support token strings mapped in index.css.
  if (color?.startsWith("#")) setCustomColorClass("");
  else if (color === "yambrownbutton") setCustomColorClass("bg-yambrownbutton");
  else setCustomColorClass("");
  }, [color]);

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className={`
        ${className}
        ${customColorClass}
        text-yambrownbuttontext font-bold py-2 px-4 rounded-lg
        hover:bg-opacity-90 transition duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isSubmitting ? "opacity-70 cursor-not-allowed" : "btn-hover-style"}
      `}
        style={{ ...(color?.startsWith("#") ? { backgroundColor: color } : {}), }}
    >
      {isSubmitting ? "Loading..." : label}
    </button>
  );
};

export default Button;