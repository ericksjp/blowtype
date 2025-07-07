import "./styles.css";
import { useTypingContext } from "../../../contexts/TypingContext";
import { CharStateType } from "react-typing-game-hook";

function TypingBox() {
  const { text, states, handleKeyDown } = useTypingContext();

  return (
      <div 
       onKeyDown={handleKeyDown} tabIndex={0}
       className="typing-test text-xl font-bold text-neutral-400 w-[700px] m-auto my-12 tracking-wide outline-none"
      >
        {text.split("").map((char: string, index: number) => {
          const state = states.charsState[index];
          const color =
            state === CharStateType.Incomplete
              ? ""
              : state === CharStateType.Correct
              ? "text-neutral-100"
              : "text-red-500";

          return (
            <span
              key={char + index}
              style={{ color }}
              className={`${states.currIndex + 1 === index ? "border-b-2 border-white bg-neutral-800 px-[2px] transform scale-105" : ""} transition-all duration-100 ${color}`}
            >
              {char}
            </span>
          );
        })}
      </div>
  );
}

export default TypingBox;

