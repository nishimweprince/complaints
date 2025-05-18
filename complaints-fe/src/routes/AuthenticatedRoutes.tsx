import { localStorageAdapter } from "@/adapters/storage/localStorage.adapter";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { setLogout } from "@/states/slices/authSlice";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AuthenticatedRoutes = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  /**
   * NAVIGATION
   */
  const { pathname } = useLocation();

  // SET RETURN URL
  const setReturnUrl = useCallback(async () => {
    await localStorageAdapter.setItem("returnUrl", pathname);
  }, [pathname]);

  useEffect(() => {
    if (!token || !user) {
      dispatch(setLogout());
      setReturnUrl();
      window.location.href = "/auth/login";
    }
  }, [dispatch, setReturnUrl, token, user]);

  return <Outlet />;
};

export default AuthenticatedRoutes;
