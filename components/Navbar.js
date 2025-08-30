import { observer } from "mobx-react-lite";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/router";

const Navbar = observer(() => {
  const userStore = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    userStore.logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 relative w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/2159px-Google_Tasks_2021.svg.png" className="h-8" alt="TaskNest Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TaskNest</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="font-medium justify-center px-4 py-2 text-gray-900 dark:text-white">
            {userStore.email ? (
              <span>{userStore.email}</span>
            ) : (
              <span>Loading... </span>
            )}
          </div>
          <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;