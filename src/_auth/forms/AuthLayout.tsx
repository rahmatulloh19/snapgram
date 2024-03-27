import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img className="hidden xl:block h-screen bg-no-repeat w-1/2 object-cover" src="assets/images/side-img.svg" alt="beautiful image" />
        </>
      )}
    </>
  );
};

export default AuthLayout;
