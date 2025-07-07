import TypingConsole from "./components/features/TypingConsole";

const text = "Sheriff John Brown always hated me For what, I don't know Every time I plant a seed He said kill it before it grow He said kill them before they grow";
function App() {
  return (
    <div>
      <TypingConsole text={text}></TypingConsole>
    </div>
  );
}

export default App;
