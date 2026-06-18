import * as Yup from "yup";

type TranslationFunction = (key: string) => string;

export const createContactFormSchema = (t: TranslationFunction) =>
  Yup.object({
    fullName: Yup.string().required(t("validation.required")),

    phone: Yup.string()
      .required(t("validation.required"))
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        t("validation.phoneInvalid"),
      ),

    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.required")),

    interestedIn: Yup.string().required(t("validation.required")),

    renovationType: Yup.string().required(t("validation.required")),

    renovationObject: Yup.string().required(t("validation.required")),

    workDescription: Yup.string(),

    startDate: Yup.date()
      .required(t("validation.required"))
      .typeError(t("validation.dateInvalid")),

    location: Yup.string().required(t("validation.required")),

    additionalComments: Yup.string(),
  });
