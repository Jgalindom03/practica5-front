import { FunctionComponent, useEffect, useState } from 'preact/hooks';
import { Signal } from '@preact/signals';
import {senalp} from ".././signals.ts";
export type Project = {
    project_name: string;
    film_ids: string[];
};

type AddToProjectProps = {
    peli_id: string;
    reboot: Signal<boolean>;
};

const getProjects = (): Project[] | undefined => {
    const project = document.cookie.split("; ").find(cookie => cookie.startsWith("project="));
    if (!project) return undefined;
    return JSON.parse(project.split("=")[1]) as Project[];
};

const AddToProject: FunctionComponent<AddToProjectProps> = ({ peli_id, reboot }) => {
    const [projectn, setprojectn] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsNames, setProjectsNames] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const projects = getProjects();
        if (!projects) {
            setError("Crea un proyecto primero");
        } else {
            setProjects(projects);
            setProjectsNames(projects.map((project) => project.project_name));
        }
    }, [reboot.value]);

    const handleAddToProject = () => {
        setError("");
        if (projectn === "") {
            setError("Selecciona un proyecto");
            return;
        }

        const selectedProject = projects.find(project => project.project_name === projectn);
        if (!selectedProject) {
            setError("Proyecto no encontrado");
            return;
        }

        if (selectedProject.film_ids.includes(peli_id)) {
            setError("La peli ya está");
            return;
        }

        selectedProject.film_ids.push(peli_id);

        document.cookie = `project=${JSON.stringify(projects)}; path=/`;

        setError("Peli añadida");
    };

    const handleSelectChange = (e: Event) => {
        const target = e.currentTarget as HTMLSelectElement;
        setprojectn(target.value);
    };

    return (
        <>
            <button  onClick={() => open("add_section")}>Añadir a proyecto</button>
            <div id="add_section" className="add_section">
                <div >
                    <select id="select_project" onChange={handleSelectChange}>
                        <option value="" disabled selected>Selecciona el proyecto </option>
                        {projectsNames.map(projectName => (
                            <option key={projectName} value={projectName}>{projectName}</option>
                        ))}
                    </select>
                    <div >
                        <button  onClick={handleAddToProject}>Add to project</button>
                        <button  onClick={() => close("add_section")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default AddToProject;

export const open = (section_id: string) => {
    const section = document.getElementById(section_id);
    if (section) section.style.display = "block";
    else console.log("");
};

export const close = (section_id: string) => {
    const section = document.getElementById(section_id);
    if (section) section.style.display = "none";
    else console.log("");
};
