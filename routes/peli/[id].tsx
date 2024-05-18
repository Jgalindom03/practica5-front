import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Peli } from "../../types.ts";
import Axios from "npm:axios";
import ButonIndex from "../../islands/ButonIndex.tsx";
import ButonModal from "../../islands/ButonModal.tsx";
export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, {id: string, peli: Peli[]}>) => {
        const { id } = ctx.params;
        try{
            const pelis = await Axios.get<Peli[]>("https://filmapi.vercel.app/api/films")
            return ctx.render({
                id: id,
                peli: pelis.data
            })

        }catch(e){
            return ctx.render({
                id: id,
                peli: []
            })
        }
    },
}

const Page = (props: PageProps<{id: string, peli: Peli[]}>) => {
    const id = props.data.id;
    const peli = props.data.peli;
    const pelicula: Peli | undefined = peli.find((pelicula) => pelicula._id === id);
    return (
        <>
            {pelicula !== undefined && (
                <div className="movie-detail">
                    <h2>{pelicula.name}</h2>
                    <img src={pelicula.staticImageUrl} alt={pelicula.name} />
                    <div className="brand">Brand: {pelicula.brand}</div>
                    <div className="iso">ISO: {pelicula.iso}</div>
                    <div className="color">Color: {pelicula.color ? "Color" : "B&N"}</div>
                    <div className="format">Formato 35mm: {pelicula.formatThirtyFive ? "Sí" : "No"}</div>
                    <div className="format">Formato 120: {pelicula.formatOneTwenty ? "Sí" : "No"}</div>
                    {pelicula.color && <div className="process">Proceso: {pelicula.process}</div>}
                    <div className="description">Descripción: <br /> {pelicula.description}</div>
                    <div className="date">Fecha añadida: {pelicula.dateAdded}</div>
                    <ButonIndex />
                    <ButonModal />
                </div>                
            )}
        </>
    );
};

export default Page;
