export const baseUrl = process.env.NEXT_PUBLIC_GENERATE_ONE_BACKEND_URI;

export const urls = {
  login: baseUrl + "/auth/login",
  logout: baseUrl + "/auth/logout",
  refreshToken: baseUrl + "/auth/refresh-tokens",
  register: baseUrl + "/auth/register",
  forgotPassword: baseUrl + "/auth/forgot-password",
  resetPassword: baseUrl + "/auth/reset-password",
  verifyEmail: baseUrl + "/auth/verify-email",
  user: baseUrl + "/users",
};
