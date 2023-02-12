export interface IRegFormPorps {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRegForm {
  email: string;
  password: string;
  confirmPassword: string;
}
