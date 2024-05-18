import { FunctionComponent, useEffect, useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import {Project} from "../types.ts"
type Props = {
    peli_id: string;
    reboot: Signal<boolean>;
}
const CreateProject: FunctionComponent<Props> = ({ peli_id, reboot }) => {
    const [projectName, setProjectName] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setProjectName("");
        setError("");
    }, [reboot.value]);

    const toggleSection = (sectionId: string, display: string) => {
        const section = document.getElementById(sectionId);
        if (section) section.style.display = display;
        else console.log("Section not found");
    };

    const getProjects = (): Project[] | undefined => {
        const project = document.cookie.split("; ").find(cookie => cookie.startsWith("project="));
        if (!project) return undefined;
        return JSON.parse(project.split("=")[1]) as Project[];
    };

    const createProject = (projectName: string, filmId: string) => {
        if (!projectName.trim()) {
            setError("El proyectoo no puede estar vacío");
            return;
        }
        const projects = getProjects() || [];
        if (projects.some(project => project.project_name === projectName)) {
            setError("El proyecto existe");
            return;
        }
        projects.push({ project_name: projectName, peli_ids: [filmId] });
        document.cookie = `project=${JSON.stringify(projects)}; path=/`;
        setError("Proyecto creado correctamente");
    };

    return (
        <>
            <button onClick={() => toggleSection("create_section", "block")}>Crrear nuevo proyecto</button>
            <div id="create_section" class="create_section" style={{ display: "none" }}>
                <div class="create_items">
                    <input type="text" placeholder="Project name" value={projectName} onBlur={(e) => setProjectName(e.currentTarget.value)} />
                    <div class="create_buttons">
                        <button class="button_" onClick={() => createProject(projectName, peli_id)}>Create</button>
                        <button class="button_" onClick={() => toggleSection("create_section", "none")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default CreateProject;
