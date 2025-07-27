import { useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/userStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const userStore = useUserStore();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    userStore.login(email);
    router.push("/projects");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}