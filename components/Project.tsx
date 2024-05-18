import { FunctionComponent } from "preact";
import { Peli, Project } from "../types.ts";

type ProjectDisplayProps = {
    project: Project[];
    pelis: Peli[];
};

const ProjectC: FunctionComponent<ProjectDisplayProps> = ({ project, pelis }) => {
    return (
        <div >
        {project.length!==0 && project.map((project) => (
        <div >
        <h1>Project {project.project_name}</h1>
                    
        <div class="PeliDisplay">
        {project.Peli_ids.map((peli_id) => {
        const peli = pelis.find((peli) => peli._id === peli_id);
        if(peli){
        return (
        <div  key={peli._id}>
        <a href={`/peli/${peli._id}`}>
        <div >
        <h1 >{peli.brand} {peli.name}</h1>
        <img src={peli.staticImageUrl} alt={peli.name} />
        <p>Format: {peli.formatThirtyFive && "Thirty Five"}{peli.formatThirtyFive && peli.formatOneTwenty && ", "}{peli.formatOneTwenty && "One Twenty"}</p>
        <p>Iso: {peli.iso}</p>
        <p>Color: {peli.color ? "Color" : "B&W"}</p>
        </div>
        </a>
        </div>
        )
        }
        })}
        </div>
        </div>
        ))}
        </div>
    );
};

export default ProjectC;
