export const InfoMenu = () => {
  return (
    <div className="right-menu-body" id="info-menu">
      <h2>
        <img src="./icdt-logo.png" width="40" alt="icdt" />
        Canada's Digital Twin
      </h2>
      <img src="./images/icdt.gif" alt="Canada's Digital Twin" width={"55%"} />
      <h3>Mission</h3>
      <p>
        Imagining Canada's Digital Twin is an <b>exploration</b> of the{" "}
        <b>idea</b> of a digital twin for Canada. Our goal is not to resolve the
        question of a digital twin for Canada, but to determine its feasibility.
      </p>

      <h3>Vision</h3>
      <p>
        What we are developing is a national, inclusive, and multidisciplinary
        research consortium to begin developing the technical, cultural, and
        ethical framework for building Canada's digital twin.
      </p>

      <h3>Values</h3>

      <ul>
        <li>
          Prioritizing equity and inclusion by supporting the largest group of
          contributors to the AECOO (architecture, engineering, construction,
          owner operator), <b> small to medium enterprises (SMEs)</b>
        </li>
        <li>
          Using open (FLOSS) standards and technologies as often as possible
        </li>
      </ul>
    </div>
  );
};
