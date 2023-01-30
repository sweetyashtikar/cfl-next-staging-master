import React, { createContext, useContext } from 'react';

import { NEXT_URL } from '@/config/index';

export interface IProfile {
  firstName: string;
  lastName: string;
  city: string;
  countryCode: string;
  id: string;
  interests: string[];
  lookingFor: string;
  cflTeam: boolean;
  premium: boolean;
  profilePicture: Record<string, any>;
  pronouns: string;
  public: boolean;
  role: string;
  skills: string[];
  slug: string;
  startupStage: string;
  tagline: string;
  user: string;
  _id: string;
  connections: string[];
}

export interface IUserData {
  email?: string;
  profile?: IProfile;
  role?: any;
}

export interface IUser extends Record<string, any> {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: string;
  lastLogin: string;
  onboarded: boolean;
  profile: IProfile;
  provider: string;
  role: Record<string, string>;
  subscription: string;
  updatedAt: string;
  _id: string;
}

// TODO: user types
// export type IUser = IUserData | null;

export interface IRegisterParams {
  email: string;
  countryDialCode: string;
  phone: string;
  password: string;
  agreement: boolean;
  subscription: boolean;
}

export interface IForgotParams {
  identifier: string;
}

export interface IResetParams {
  password: string;
  passwordConfirmation: string;
}

export interface IValidateParams {
  identifier: string;
  emailToken: string;
  phoneToken: string;
}

export interface ILoginParams {
  identifier: string;
  password: string;
}

export interface IAuthContext {
  connect: (provider: string, query: string) => Promise<boolean> | boolean;
  register: (user: IRegisterParams) => void;
  forgot: (user: IForgotParams) => Promise<boolean> | boolean;
  reset: (user: IResetParams) => Promise<boolean> | boolean;
  validate: (user: IValidateParams) => void;
  login: (params: ILoginParams) => Promise<boolean> | boolean;
  logout: () => Promise<boolean> | boolean;
  hasSession: () => Promise<IUser>;
}

export interface AuthError extends Error {
  status: number;
}

export const AuthContext = createContext<IAuthContext>({
  connect: () => false,
  register: () => ({}),
  forgot: () => false,
  reset: () => false,
  validate: () => ({}),
  login: () => false,
  logout: () => false,
  hasSession: async () => ({} as IUser),
});

export const useProvideAuth = () => {
  // Provider connect
  const connect = async (provider: string, query: string) => {
    const res = await fetch(`${NEXT_URL}/api/connect/${provider}?${query}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Register user
  const register = async (user: IRegisterParams) => {
    if (!user.agreement || !user.subscription) return false;
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Forgot user
  const forgot = async (body: IForgotParams) => {
    const res = await fetch(`${NEXT_URL}/api/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Reset user
  const reset = async (body: IResetParams) => {
    const res = await fetch(`${NEXT_URL}/api/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Validate user
  const validate = async (params: IValidateParams) => {
    const res = await fetch(`${NEXT_URL}/api/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Login user
  const login = async ({ identifier, password }: ILoginParams) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    const data = await res.json();

    if (res.ok) {
      return true;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  // Check if user is logged in
  const hasSession = async (): Promise<IUser> => {
    const res = await fetch(`${NEXT_URL}/api/me`);
    const data = await res.json();

    if (res.ok) {
      return data.user;
    } else {
      const error = new Error(data.message) as AuthError;
      error.status = res.status;
      throw error;
    }
  };

  return {
    connect,
    register,
    forgot,
    reset,
    validate,
    login,
    logout,
    hasSession,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
