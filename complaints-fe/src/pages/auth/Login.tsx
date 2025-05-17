import Button from "@/components/inputs/Button";
import Input from "@/components/inputs/Input";
import { Heading } from "@/components/inputs/TextInputs";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "@/usecases/auth/auth.hooks";

const Login = () => {
  /**
   * STATE VARIABLES
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * USE CASES
   */
  const { login, loginIsLoading } = useLogin();

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // HANDLE FORM SUBMIT
  const onSubmit = handleSubmit((data) => {
    login({
      username: data.username,
      password: data.password,
    });
  });

  return (
    <main className="w-full h-screen items-center justify-center flex flex-col gap-4">
      <form
        className="w-full py-8 max-w-[35%] sm:max-w-[35%] md:max-w-[35%] lg:max-w-[35%] shadow-md rounded-md bg-white p-4 mx-auto flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <header className="flex flex-col gap-2 items-center mb-4">
          <Heading type="h1">Welcome Back</Heading>
          <p className="text-sm text-secondary">
            Please sign in to your account
          </p>
        </header>
        <fieldset className="w-full flex flex-col gap-5">
          <Controller
            control={control}
            name="username"
            rules={{
              required: `Please enter your username`,
            }}
            render={({ field }) => (
              <Input
                {...field}
                errorMessage={errors.username?.message}
                placeholder="Enter email or phone number"
                label="Username"
                required
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: `Please enter your password`,
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter password"
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                suffixIcon={showPassword ? faEyeSlash : faEye}
                suffixIconHandler={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            )}
          />
        </fieldset>
        <menu className="w-full flex items-center justify-between gap-2">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <Input
                type="checkbox"
                label="Remember me"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Link
            to="/auth/forgot-password"
            className="text-secondary text-sm hover:underline hover:text-primary transition-colors duration-200"
          >
            Forgot Password?
          </Link>
        </menu>
        <Button type="submit" isLoading={loginIsLoading}>
          Login
        </Button>
      </form>
    </main>
  );
};

export default Login;
