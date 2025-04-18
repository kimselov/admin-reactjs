// auth.js (create this in `src`)
export const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
  };
  
  export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  