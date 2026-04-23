
import { api } from "@/lib/axios.cfg";
import { Roles, User } from "@/types/User.type";


export type RegisterResponse = {
  id : number
  name : string
  email : string
  role : Roles
  image : string
}

type LoginResponse ={
  accessToken: string;
  user: User;
}

export const registerUser = async (
  name : string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {

  const res = await api.post("/auth/register",{
    name, email, password
  });
  
  return res.data;
};

export const loginRequest = async (
    email :  string, 
    password : string
) : Promise<LoginResponse> => {
    
    const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
    });

    return res.data;
}