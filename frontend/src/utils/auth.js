// Save the JWT token to localStorage
export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Get the JWT token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Remove the JWT token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = () => {
    return !!getToken();
  };
  