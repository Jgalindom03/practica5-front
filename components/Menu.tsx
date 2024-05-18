import { FunctionComponent } from "preact";

const Menu: FunctionComponent = () => {
  return (
    <nav>
      <a href="/">
        <i class="fa-solid fa-film"></i>
        <span>Ver peliculas </span>
      </a>
      <a href="/project">
        <i class="fa-solid fa-rectangle-list"></i>
        <span>Ver proyectos</span>
      </a>
    </nav>
  );
};

export default Menu;
