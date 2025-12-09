import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../../shared/services/api';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user || user.provider !== 'google' || user.is_password_set) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const setPasswordMutation = useMutation({
    mutationFn: authAPI.setPassword,
    onSuccess: () => {
      toast.success('Đặt mật khẩu thành công!');
      navigate('/', { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đặt mật khẩu thất bại!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setPasswordMutation.mutate(password);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md px-12">
        {/* Logo */}
        <div className='flex items-center flex-col justify-center gap-y-4 mb-5'>
          <div className="flex items-center space-x-3 hover:scale-105 transition cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Đặt mật khẩu
            </h1>
            <p className="text-gray-600 mt-2">
              Để bảo mật tài khoản, vui lòng đặt mật khẩu cho tài khoản Google của bạn
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu mới"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              className="w-full px-4 py-3 bg-white border-2 border-blue-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={setPasswordMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {setPasswordMutation.isPending ? 'Đang đặt mật khẩu...' : 'Đặt mật khẩu'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Mật khẩu sẽ được sử dụng để đăng nhập bằng email khi không sử dụng Google
          </p>
        </div>
      </div>
    </div>
  );
}