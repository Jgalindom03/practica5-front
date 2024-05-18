import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useEffect, useState } from "preact/hooks";
import { Peli } from "../types.ts";

const Listapelis: FunctionComponent = () => {
  const [peliculas, setPeliculas] = useState<Peliculas[]>([]);
  const [name, setName] = useState<string>("");
  const [iso, setIso] = useState<number>();
  const [brand, setBrand] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [formatThirtyFive, setFormatThirtyFive] = useState<boolean>(false);
  const [formatOneTwenty, setFormatOneTwenty] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pelis = await fetch("api/pelis", {
          method: "GET",
        });
        const data = await pelis.json();
        setPeliculas(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const filteredPeliculas = peliculas.filter((pelicula) => {
    let include = true;
    if (name && !pelicula.name.includes(name)) {
      include = false;
    }
    if (brand && pelicula.brand !== brand) {
      include = false;
    }
    if (color === "true" && !pelicula.color) {
      include = false;
    }
    if (color === "false" && pelicula.color) {
      include = false;
    }
    if (iso && pelicula.iso !== iso) {
      include = false;
    }
    if (formatThirtyFive && !pelicula.formatThirtyFive) {
      include = false;
    }
    if (formatOneTwenty && !pelicula.formatOneTwenty) {
      include = false;
    }
    return include;
  });

  const marcaOptions = [...new Set(filteredPeliculas.map((pelicula) => pelicula.brand))];
  const colorOptions = [...new Set(filteredPeliculas.map((pelicula) => pelicula.color))];
  const isoOptions = [...new Set(filteredPeliculas.map((pelicula) => pelicula.iso))];
  const formatThirtyFiveOptions = [...new Set(filteredPeliculas.map((pelicula) => pelicula.formatThirtyFive))];
  const formatOneTwentyOptions = [...new Set(filteredPeliculas.map((pelicula) => pelicula.formatOneTwenty))];

  return (
    <>
      <h1>Lista de Películas</h1>
      <form>
        <label>Buscar por Nombre:</label>
        <input type="text" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)} />
        <br />
        <label>Seleccionar Marca:</label>
        <select value={brand} onChange={(e) => setBrand((e.target as HTMLSelectElement).value)}>
          <option value="">Seleccionar</option>
          {marcaOptions.map((marca) => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        <br />
        <label>Seleccionar Color:</label>
        <select value={color} onChange={(e) => setColor((e.target as HTMLSelectElement).value)}>
          <option value="">Seleccionar</option>
          {colorOptions.map((color) => (
            <option key={color} value={color.toString()}>{color ? 'Color' : 'B/N'}</option>
          ))}
        </select>
        <br />
        <div className="form-checkbox">
          <input type="checkbox" checked={formatThirtyFive} onChange={(e) => setFormatThirtyFive((e.target as HTMLInputElement).checked)} />
          <label>Formato 35mm</label>
        </div>
        <div className="form-checkbox">
          <input type="checkbox" checked={formatOneTwenty} onChange={(e) => setFormatOneTwenty((e.target as HTMLInputElement).checked)} />
          <label>Formato 120</label>
        </div>
        <label>Seleccionar ISO:</label>
        <select value={iso} onChange={(e) => setIso(parseInt((e.target as HTMLSelectElement).value))}>
          <option value="">Seleccionar</option>
          {isoOptions.map((iso) => (
            <option key={iso} value={iso}>{iso}</option>
          ))}
        </select>
      </form>
      <div className="movie-list">
        {filteredPeliculas.map((pelicula) => (
          <a href={`/peli/${pelicula._id}`}>
          <div key={pelicula.id} className="movie-item">
            <div><strong>Nombre:</strong> {pelicula.name}</div>
            <div><strong>Marca:</strong> {pelicula.brand}</div>
            <div><strong>Color:</strong> {pelicula.color ? 'Color' : 'B/N'}</div>
            <div><strong>Formato 35mm:</strong> {pelicula.formatThirtyFive ? 'Sí' : 'No'}</div>
            <div><strong>Formato 120:</strong> {pelicula.formatOneTwenty ? 'Sí' : 'No'}</div>
            <div><strong>ISO:</strong> {pelicula.iso}</div>
            <img src={pelicula.staticImageUrl} alt={pelicula.name} />
          </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Listapelis;