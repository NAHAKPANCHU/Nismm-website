import axios from "axios";

// ✅ Updated to match backend response
interface User {
 _id: string;
 username: string;
 email: string;
 role: string;
 isActive: boolean;
 isEmailVerified: boolean;
 loginAttempts: number;
 createdAt: string;
 updatedAt: string;
 __v: number;
 isLocked: boolean;
 fullName: string;
 id: string;
}

interface LoginCredentials {
 identifier: string;
 password: string;
 remember?: boolean;
}

interface AuthResponse {
 statusCode: number;
 data: {
  user: User;
  accessToken: string;
  refreshToken: string;
 };
 message: string;
 success: boolean;
}

// ✅ Best practice: Handle errors consistently
export const handleApiError = (error: unknown): string => {
 if (axios.isAxiosError(error)) {
  return (
   error.response?.data?.message || error.message || "An API error occurred"
  );
 }
 if (error instanceof Error) {
  return error.message;
 }
 return "An unknown error occurred";
};

export const authApi = {
 login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
   const response = await axios.post<AuthResponse>(
    "/api/users/login",
    credentials,
    {
     withCredentials: true,
    }
   );

   // ✅ Validation before returning
   if (!response.data.success) {
    throw new Error(response.data.message || "Login failed");
   }

   return response.data;
  } catch (error) {
   console.error("Login failed:", handleApiError(error));
   throw new Error(handleApiError(error));
  }
 },

 logout: async (): Promise<void> => {
  try {
   const token = sessionStorage.getItem("accessToken");

   if (!token) throw new Error("No access token found");

   await axios.post(
    "/api/users/logout",
    {},
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
     withCredentials: true, // optional if backend sets any cookies
    }
   );

   sessionStorage.clear();
   console.log("✅ User logged out successfully");
  } catch (error) {
   console.error("Logout failed:", handleApiError(error));
   throw new Error(handleApiError(error));
  }
 },

 register: async (userData: {
  username: string;
  email: string;
  password: string;
 }): Promise<AuthResponse> => {
  try {
   const response = await axios.post<AuthResponse>(
    "/api/users/register",
    userData,
    { withCredentials: true }
   );

   if (!response.data.success) {
    throw new Error(response.data.message || "Registration failed");
   }

   return response.data;
  } catch (error) {
   console.error("Registration failed:", handleApiError(error));
   throw new Error(handleApiError(error));
  }
 },

 // ✅ Optional: Helper to store tokens after login
 storeTokens: (authResponse: AuthResponse) => {
  const { accessToken, refreshToken } = authResponse.data;
  // Use in-memory storage or sessionStorage based on 'remember' preference
  if (typeof window !== "undefined") {
   sessionStorage.setItem("accessToken", accessToken);
   sessionStorage.setItem("refreshToken", refreshToken);
   sessionStorage.setItem("user", JSON.stringify(authResponse.data.user));
  }
 },

 // ✅ Optional: Helper to get current user from stored data
 getCurrentUser: (): User | null => {
  if (typeof window !== "undefined") {
   const user = sessionStorage.getItem("user");
   return user ? JSON.parse(user) : null;
  }
  return null;
 },
};

export type { AuthResponse, LoginCredentials, User };
