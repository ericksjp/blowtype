import "./styles.css";
import TypingStats from "./TypingStats";
import TypingBox from "./TypingBox";
import DemoProvider from "../../../providers/TypingProvider";

interface TypingBoxProps {
  text: string;
}

function TypingConsole({ text }: TypingBoxProps) {
  return (
    <DemoProvider text={text}>
      <TypingStats/>
      <TypingBox />
    </DemoProvider>
  );
}

export default TypingConsole;
