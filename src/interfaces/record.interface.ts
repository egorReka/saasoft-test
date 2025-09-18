export interface Record {
  id: string;
  label: {
    value: string;
    isValid: boolean;
  };
  type: string;
  login: {
    value: string;
    isValid: boolean;
  };
  password: {
    value: string;
    isValid: boolean;
  };
}
