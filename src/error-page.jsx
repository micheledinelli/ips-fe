import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-hero-pattern-3 bg-cover text-white">
      <h1 className="text-5xl">Oops!</h1>
      <p className="text-2xl m-3">Sorry, an unexpected error has occurred.</p>
      <p className="m-5">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
