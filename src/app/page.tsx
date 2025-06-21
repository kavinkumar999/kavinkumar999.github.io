import Main from "./components/main";
import Work from "./components/work";
import { Meteors } from "./components/ui/meteors";

export default function Home() {
  return (
    <>
      <Meteors number={5} />
      <Main />
      <Work />
    </>
  );
}
