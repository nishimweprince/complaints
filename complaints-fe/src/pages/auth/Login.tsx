import Button from '@/components/inputs/Button';
import Input from '@/components/inputs/Input';
import { Heading } from '@/components/inputs/TextInputs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/usecases/auth/auth.hooks';
import AuthNavbar from '@/containers/navigation/AuthNavbar';
import { useAppSelector } from '@/states/hooks';

const Login = () => {
  /**
   * STATE VARIABLES
   */
  const [showPassword, setShowPassword] = useState(false);
  const { user, token } = useAppSelector((state) => state.auth);

  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user && token) {
      navigate('/dashboard');
    }
  }, [user, token, navigate]);

  return (
    <>
      <AuthNavbar />
      <main className="w-full min-h-[calc(100vh-4rem)] items-center justify-center flex flex-col gap-4 bg-background px-4 py-8">
        <form
          className="w-full max-w-[450px] shadow-md rounded-md bg-white p-6 sm:p-8 flex flex-col gap-6"
          onSubmit={onSubmit}
        >
          <header className="flex flex-col gap-2 items-center mb-2">
            <Heading type="h1">Welcome Back</Heading>
            <p className="text-sm text-secondary text-center">
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
                  type={showPassword ? 'text' : 'password'}
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
          </menu>
          <Button type="submit" isLoading={loginIsLoading}>
            Login
          </Button>
          <div className="text-sm text-secondary text-center">
            Don't have an account?{' '}
            <Link
              to="/auth/signup"
              className="text-primary hover:underline transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
