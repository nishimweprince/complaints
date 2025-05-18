import { localStorageAdapter } from "@/adapters/storage/localStorage.adapter";
import { useLoginMutation } from "@/api/mutations/apiSlice";
import { useAppDispatch } from "@/states/hooks";
import { setPermissions, setToken, setUser } from "@/states/slices/authSlice";
import { useCallback, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * LOGIN
 */
export const useLogin = () => {
  // STATE VARIABLES
  const dispatch = useAppDispatch();

  //
  const navigate = useNavigate();

  // MUTATION
  const [
    login,
    {
      isLoading: loginIsLoading,
      isError: loginIsError,
      isSuccess: loginIsSuccess,
      error: loginError,
      data: loginData,
    },
  ] = useLoginMutation();

  // GET RETURN URL
  const getReturnUrl = useCallback(async () => {
    const returnUrl = await localStorageAdapter.getItem("returnUrl");
    return returnUrl || "/dashboard";
  }, []);

  useEffect(() => {
    if (loginIsSuccess) {
      toast.success("Login successful");
      dispatch(setToken(loginData?.data.token));
      dispatch(setUser(loginData?.data.user));
      dispatch(setPermissions(loginData?.data?.permissions));
      getReturnUrl().then((returnUrl) => {
        navigate(returnUrl as To);
      });
    } else if (loginIsError) {
      toast.error(
        (
          loginError as {
            data: {
              message: string;
            };
          }
        )?.data?.message
      );
    }
  }, [
    dispatch,
    loginData,
    loginIsSuccess,
    loginIsError,
    loginError,
    navigate,
    getReturnUrl,
  ]);

  return { login, loginIsLoading, loginIsError, loginIsSuccess, loginError };
};
