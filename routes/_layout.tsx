import { PageProps } from "$fresh/server.ts";
import Menu from "../components/Menu.tsx";

export default ({ Component }: PageProps) => {
  return (
    <>
      <Menu />
        <Component />
    </>
  );
};