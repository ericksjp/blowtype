import { useTypingContext } from "../../../contexts/TypingContext"

export default function TypingStats() {
  const {wpm, accuracy } = useTypingContext();

  return (
    <div className="flex align-middle m-2 mx-12 justify-evenly gap-8">
        <div className="flex">
          <p className="text">chapter 1</p>
          <p className="text">Page 1/19</p>
        </div>
        <div className="flex">
          <p className="text">{Math.round(wpm) || 0} WPM</p>
          <p className="text">{accuracy.toFixed(2)}% ACC</p>
        </div>
      </div>
  )
}

