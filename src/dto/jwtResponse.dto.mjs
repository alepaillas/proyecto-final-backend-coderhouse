export const jwtResponseDto = (user) => {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
  };
};
