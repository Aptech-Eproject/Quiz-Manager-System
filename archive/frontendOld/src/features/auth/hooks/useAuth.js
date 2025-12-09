import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../../shared/services/api';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const { setAuth, logout: logoutStore } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem('refreshToken');
      return refreshToken ? authAPI.logout(refreshToken) : Promise.resolve();
    },
    onSettled: () => {
      logoutStore();
      toast.success('Đăng xuất thành công!');
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = response.data?.data || {};
      setAuth(user, access_token, refresh_token);
      toast.success('Đăng nhập thành công!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại!');
    },
  });

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại!');
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: authAPI.googleLogin,
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = response.data?.data || {};
      setAuth(user, access_token, refresh_token);
      toast.success('Đăng nhập Google thành công!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đăng nhập Google thất bại!');
    },
  });

  const setPasswordMutation = useMutation({
    mutationFn: authAPI.setPassword,
    onSuccess: () => {
      toast.success('Đặt mật khẩu thành công!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đặt mật khẩu thất bại!');
    },
  });

  const refreshMutation = useMutation({
    mutationFn: authAPI.refresh,
    onSuccess: (response) => {
      const { accessToken } = response.data?.data || {};
      const { refreshToken } = useAuthStore.getState();
      setAuth(useAuthStore.getState().user, accessToken, refreshToken);
    },
    onError: () => {
      logout();
      toast.error('Phiên đăng nhập đã hết hạn!');
    },
  });

  return { 
    loginMutation, 
    registerMutation, 
    googleLoginMutation, 
    setPasswordMutation,
    refreshMutation,
    logoutMutation,
    logout 
  };
};
