import { Peli, Project } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ProjectC from "../components/Project.tsx"
import { getCookies } from "$std/http/cookie.ts";

type Props = {
    project: Project[];
    peli: Peli[];
};

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext) => {
        const url = "https://filmapi.vercel.app/api/films";
        const res = await fetch(url);
        const pelis: Peli[] = await res.json();

        const projectsCookie = getCookies(req.headers).project;
        let projects: Project[] = [];

        if (projectsCookie) {
            projects = JSON.parse(projectsCookie);
        }

        return ctx.render({ project: projects, peli: pelis });
    },
};

const Page = (props: PageProps<Props>) => {
    const { project, peli } = props.data;

    return (
        <>
            <div >
                <h1 >Projects</h1>
            </div>
            <div>
            </div>
            <ProjectC project={project} peli={peli} />
        </>
    );
}

export default Page;
