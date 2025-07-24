import { useState } from "react";

const HoverTextEffect = ({ text }: { text: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <h1 className="font-bold inline-block p-2 text-lg cursor-default">
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="mr-2">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`transition-colors duration-100 ${
                hoveredIndex === `${wordIndex}-${charIndex}`
                  ? "text-white dark:text-[#E8B5B8]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredIndex(`${wordIndex}-${charIndex}`)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default HoverTextEffect;
