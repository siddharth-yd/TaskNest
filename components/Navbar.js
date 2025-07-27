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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">Email: {userStore.email || "Not Logged In"}</div>
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      </div>
    </nav>
  );
});

export default Navbar;