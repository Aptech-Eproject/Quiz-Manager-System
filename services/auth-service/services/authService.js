const { hashPassword, comparePassword } = require('../lib/bcrypt');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../lib/jwt');
const { User, RefreshToken } = require('../models');
const axios = require('axios');
const { Op } = require('sequelize');


// ============================================
// REGISTER (email + password)
// ============================================
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("Email đã tồn tại.");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local",
    is_password_set: true
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    provider: newUser.provider
  };
};


// ============================================
// LOGIN (email + password)
// ============================================
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("Email không tồn tại");

  if (user.provider === "google" && !user.is_password_set) {
    throw new Error("Tài khoản Google, vui lòng đặt mật khẩu trước");
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Mật khẩu không chính xác");

  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user.id });

  await RefreshToken.create({
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken, refreshToken, user };
};


// ============================================
// GOOGLE LOGIN
// ============================================
const googleLoginUser = async (credential) => {
  const googleURL = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
  const { data } = await axios.get(googleURL);

  const { email, name, picture, sub } = data;

  let user = await User.findOne({ 
    where: { email }
  });

  // Nếu chưa có user → tạo mới
  if (!user) {
    user = await User.create({
      name,
      email,
      google_id: sub,
      avatar: picture,
      provider: "google",
      is_password_set: false
    });
  }

  // Nếu có user local → chuyển thành hybrid
  if (user.provider === "local" && !user.google_id) {
    user.google_id = sub;
    user.provider = "google";
    await user.save();
  }

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  await RefreshToken.create({
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken, refreshToken, user };
};


// ============================================
// SET PASSWORD FOR GOOGLE USER (Lần đầu tiên)
// ============================================
const setPasswordForGoogleUser = async (userId, newPassword) => {
  const user = await User.findByPk(userId);

  if (!user) throw new Error("Không tìm thấy user");

  if (user.provider !== "google") {
    throw new Error("Chỉ user Google mới được set password");
  }

  const hashed = await hashPassword(newPassword);

  user.password = hashed;
  user.is_password_set = true;
  await user.save();

  return { message: "Đặt mật khẩu thành công" };
};


// ============================================
// REFRESH ACCESS TOKEN
// ============================================
const refreshToken = async (token) => {
  const decoded = verifyRefreshToken(token);

  const saved = await RefreshToken.findOne({
    where: {
      user_id: decoded.id,
      token
    }
  });

  if (!saved) throw new Error("Refresh token không hợp lệ");

  const newAccess = generateAccessToken({ id: decoded.id });

  return { accessToken: newAccess };
};


// ============================================
// LOGOUT (revoke refresh token)
// ============================================
const logout = async (token) => {
  await RefreshToken.destroy({ where: { token } });
  return { message: "Đăng xuất thành công" };
};


// ============================================
// GET PROFILE
// Gateway đã verify JWT, req.user.id đã có
// ============================================
const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] }
  });

  if (!user) throw new Error("Không tìm thấy user");
  return user;
};


module.exports = {
  registerUser,
  loginUser,
  googleLoginUser,
  setPasswordForGoogleUser,
  refreshToken,
  logout,
  getUserProfile
};
