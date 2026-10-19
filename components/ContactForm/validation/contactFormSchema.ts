
import * as Yup from "yup";

type TranslationFunction = (key: string) => string;

const isValidPhoneNumber = (value: string | undefined): boolean => {
  if (!value) return true;

  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");

  const hasValidCharacters = /^\+?[\d\s().-]+$/.test(phone);
  const hasValidLength = digits.length >= 7 && digits.length <= 15;

  return hasValidCharacters && hasValidLength;
};

export const createContactFormSchema = (t: TranslationFunction) =>
  Yup.object({
    fullName: Yup.string()
      .trim()
      .required(t("validation.required")),

    phone: Yup.string()
      .trim()
      .required(t("validation.required"))
      .test(
        "valid-phone",
        t("validation.phoneInvalid"),
        isValidPhoneNumber,
      ),

    email: Yup.string()
      .trim()
      .email(t("validation.emailInvalid"))
      .required(t("validation.required")),

    interestedIn: Yup.string().required(t("validation.required")),

    renovationType: Yup.string().required(t("validation.required")),

    renovationObject: Yup.string().required(t("validation.required")),

    area: Yup.string().test(
  "valid-area",
  t("validation.areaInvalid"),
  (value) => {
    if (!value?.trim()) return true;

    const normalized = value.trim().replace(",", ".");

    return /^\d+(\.\d{1,2})?$/.test(normalized) &&
      Number(normalized) > 0;
  },
),

    workDescription: Yup.string(),

    startDate: Yup.date()
      .required(t("validation.required"))
      .typeError(t("validation.dateInvalid")),

    location: Yup.string()
      .trim()
      .required(t("validation.required")),

    additionalComments: Yup.string(),
  });