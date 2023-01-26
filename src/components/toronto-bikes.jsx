import { useResources } from "../utils/useResources";

export const TorontoBikes = () => {
  const resources = useResources("12ef161c-1553-43f6-8180-fed700e42912", 50);

  return (
    <div>
      <select>
        {Boolean(resources.length) &&
          resources.map((resource, index) => {
            const { id, geometry, MAP_CLASS } = resource;
            const coordGeo = JSON.parse(geometry);
            console.log(coordGeo);
            const key = `${id}${index}`;
            return <option key={key}>{MAP_CLASS}</option>;
          })}
      </select>
    </div>
  );
};
