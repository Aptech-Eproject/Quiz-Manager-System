const authService = require('../services/authService');
const { success, error } = require('../lib/response');


// ===============================
// REGISTER
// ===============================
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    return success(res, result, "Đăng ký thành công");
  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// LOGIN (email + password)
// ===============================
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    return success(res, {
      user: result.user,
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }, "Đăng nhập thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// GOOGLE LOGIN
// ===============================
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return error(res, "Thiếu Google credential", 400);
    }

    const result = await authService.googleLoginUser(credential);

    return success(res, {
      user: result.user,
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }, "Đăng nhập Google thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// SET PASSWORD FOR GOOGLE USER (FIRST TIME)
// ===============================
const setPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return error(res, "Thiếu mật khẩu mới", 400);
    }

    // req.user.id được lấy từ Gateway
    const result = await authService.setPasswordForGoogleUser(req.user.id, newPassword);

    return success(res, result, "Đặt mật khẩu thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// REFRESH TOKEN
// ===============================
const refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return error(res, "Thiếu refresh token", 400);
    }

    const result = await authService.refreshToken(refresh_token);

    return success(res, result, "Refresh thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// LOGOUT
// ===============================
const logout = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return error(res, "Thiếu refresh token", 400);
    }

    await authService.logout(refresh_token);

    return success(res, null, "Đăng xuất thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


// ===============================
// GET USER PROFILE
// ===============================
// Gateway đã decode Access Token → req.user
const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return error(res, "Không xác thực được người dùng", 401);
    }

    const profile = await authService.getUserProfile(req.user.id);
    const profileData = (profile && typeof profile.toJSON === "function")
      ? profile.toJSON()
      : profile;

    const sanitizedProfile = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      avatar: profileData.avatar,
      provider: profileData.provider,
      role: profileData.role,
      is_password_set: profileData.is_password_set,
      created_at: profileData.createdAt,
      updated_at: profileData.updatedAt
    };

    return success(res, sanitizedProfile, "Lấy profile thành công");

  } catch (err) {
    return error(res, err.message, 400);
  }
};


module.exports = {
  register,
  login,
  googleLogin,
  setPassword,
  refresh,
  logout,
  getProfile
};
