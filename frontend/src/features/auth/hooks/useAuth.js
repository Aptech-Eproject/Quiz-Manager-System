import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { setAuth, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
  });

  return { loginMutation, registerMutation, logout };
};
