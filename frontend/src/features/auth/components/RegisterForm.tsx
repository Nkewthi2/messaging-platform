import { useForm } from "react-hook-form";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {

  const {
    register,
    handleSubmit,
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <h1 className="text-3xl font-bold text-white">
        Register
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

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="p-3 rounded-lg bg-zinc-800 text-white"
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
      >
        Register
      </button>
    </form>
  );
}