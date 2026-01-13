import { create } from "zustand";


type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  adhaarNumber: string;
  avatar?: string;
  panNumber?: string;
  gender?: string;
  role?: string;
  termsAccepted?: boolean;
  dob: string;
  errors?: Record<string, string>;


};

type SignInData = {
  email: string;
  password: string;
}

type AuthStore = {
  registerData: RegisterData;
  loginData: SignInData;
  registerStep: number;
  loading: boolean;
  errors: Record<string, string> | null;
  setRegisterData: (data: Partial<RegisterData>) => void;
  setLoginData: (data: Partial<SignInData>) => void;

  nextRegisterStep: () => void;
  prevRegisterStep: () => void;
  setLoading: (loading: boolean) => void;
  setErrors: (errors: Record<string, string>   | null) => void;
  resetRegister: () => void;
  resetLogin: () => void;
  clearErrors: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  registerData: {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    adhaarNumber: "",
    avatar: undefined,
    panNumber: "",
    gender: "",
    role: "tenant",
    termsAccepted: false,
    dob: "",
  },
  loginData: {
    email: "",
    password: "",
  },
  registerStep: 1,
  loading: false,
  errors: null,
  setRegisterData: (data) =>
    set((state) => ({
      registerData: { ...state.registerData, ...data },
    })),
  setLoginData: (data) =>
    set((state) => ({
      loginData: { ...state.loginData, ...data },
    })),
  nextRegisterStep: () =>
    set((state) => ({
      registerStep: state.registerStep + 1,
    })),
  prevRegisterStep: () =>
    set((state) => ({
      registerStep: state.registerStep - 1,
    })),
  setLoading: (loading) => set(() => ({ loading })),
  setErrors: (errors) => set(() => ({ errors })),
  clearErrors: () => set(() => ({ errors: null })),
  resetRegister: () =>
    set(() => ({
      registerData: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        adhaarNumber: "",
        avatar: undefined,
        panNumber: "",
        gender: "",
        role: "tenant",
        termsAccepted: false,
        dob: "",
      },
      registerStep: 1,
      loading: false,
      error: null,
    })),
  resetLogin: () =>
    set(() => ({
      loginData: {
        email: "",
        password: "",
      },
      loading: false,
      error: null,
    }
  ))
}));