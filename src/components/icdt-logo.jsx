// const reload = (event) => {
//   setTimeout(function () {
//     window.location.reload();
//   }, 100);
// };

export const IcdtLogo = () => {
  return (
    <>
      <div
        id="icdt-button"
        title="Imagine Canada's Digital Twin"
        className="icon"
        // onClick={reload()}
      >
        <img
          src="icdt-logo.png"
          alt="Imagine Canada's Digital Twin"
          height="55px"
        />
      </div>
    </>
  );
};
