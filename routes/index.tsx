import { PageProps, Handlers, FreshContext } from "$fresh/server.ts";
import Listapelis from "../islands/Listapelis.tsx";

const Page = (props: PageProps) => {
  return (
    <>
      <Listapelis/>
    </>
  );
}

export default Page;
