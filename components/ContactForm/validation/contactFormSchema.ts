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

const isValidFutureDate = (value: string | undefined): boolean => {
  if (!value) return true;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValidDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
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

    startDate: Yup.string()
  .required(t("validation.required"))
  .test(
    "valid-date",
    t("validation.dateInvalid"),
    isValidFutureDate,
  ),

    location: Yup.string()
      .trim()
      .required(t("validation.required")),

    additionalComments: Yup.string(),

    privacyAcknowledged: Yup.boolean()
  .oneOf([true], t("validation.privacyRequired"))
  .required(t("validation.privacyRequired")),
  });