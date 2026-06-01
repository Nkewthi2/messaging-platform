import { useForm } from "react-hook-form";
import { login } from "../api";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <h1 className="text-3xl font-bold text-white">
        Login
      </h1>

      <input
        {...register("username")}
        placeholder="Username"
        className="p-3 rounded-lg bg-zinc-800 text-white"
      />

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="p-3 rounded-lg bg-zinc-800 text-white"
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
      >
        Login
      </button>
    </form>
  );
}