import Button from '@/components/inputs/Button';
import Input from '@/components/inputs/Input';
import { Heading } from '@/components/inputs/TextInputs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthNavbar from '@/containers/navigation/AuthNavbar';
import { useSignup } from '@/usecases/auth/auth.hooks';

const Signup = () => {
  /**
   * STATE VARIABLES
   */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * USE CASES
   */
  const { signup, signupIsLoading } = useSignup();

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  // HANDLE FORM SUBMIT
  const onSubmit = handleSubmit((data) => {
    signup({
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber || '',
    });
  });

  return (
    <>
      <AuthNavbar />
      <main className="w-full min-h-[calc(100vh-4rem)] items-center justify-center flex flex-col gap-4 bg-background px-4 py-8">
        <form
          className="w-full max-w-[450px] shadow-md rounded-md bg-white p-6 sm:p-8 flex flex-col gap-6"
          onSubmit={onSubmit}
        >
          <header className="flex flex-col gap-2 items-center mb-2">
            <Heading type="h1">Create Account</Heading>
            <p className="text-sm text-secondary text-center">
              Please fill in your details to create an account
            </p>
          </header>
          <fieldset className="w-full flex flex-col gap-5">
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Please enter your username',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.username?.message}
                  placeholder="Enter your email"
                  label="Email"
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.phoneNumber?.message}
                  placeholder="Enter your phone number (optional)"
                  label="Phone Number"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Please enter your password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.password?.message}
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
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.confirmPassword?.message}
                  placeholder="Confirm password"
                  label="Confirm Password"
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  suffixIcon={showConfirmPassword ? faEyeSlash : faEye}
                  suffixIconHandler={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                />
              )}
            />
          </fieldset>
          <section className="text-sm text-secondary text-center">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-primary hover:underline transition-colors duration-200"
            >
              Sign in
            </Link>
          </section>
          <Button type="submit" isLoading={signupIsLoading}>
            Create Account
          </Button>
        </form>
      </main>
    </>
  );
};

export default Signup;
