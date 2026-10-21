import { FormikHelpers, FormikValues } from "formik";

export interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  renovationType: string;
  renovationObject: string;
  area: string;
  workDescription: string;
  attachments: File[];
  startDate: string;
  location: string;
  additionalComments: string;
  privacyAcknowledged: boolean;
}

export interface FormDatePickerProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
  validateField: (
    field: string,
  ) => void | Promise<string | undefined> | Promise<void>;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  error?: string;
  touched?: boolean;
  required?: boolean;
  onChange: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
  onBlur: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
  validateField: (
    field: string,
  ) => void | Promise<string | undefined> | Promise<void>;
}

export interface DetailsSectionProps {
  files: File[];
  setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
}

export interface ContactFormProps {
  onClose?: () => void;
}

export interface FileUploadProps {
  files: File[];
  setFieldValue: (field: string, value: File[]) => void;
}