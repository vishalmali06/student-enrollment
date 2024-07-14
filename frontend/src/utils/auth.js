export const logout = (navigate) => {
    localStorage.removeItem('userInfo');
    navigate('/login');
};
