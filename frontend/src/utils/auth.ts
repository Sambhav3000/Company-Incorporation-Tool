export const setToken = (token:string)=>{
    localStorage.setItem("jwtToken",token);
}

export const getToken = (): string | null => {
  return localStorage.getItem("jwtToken"); 
};

export const removeToken = (): void=>{
    localStorage.removeItem("jwtToken");
}