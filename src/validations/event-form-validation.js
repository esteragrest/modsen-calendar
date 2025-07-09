import { DATE_RE, MAX_LENGTH, TIME_RE } from "@/constants/event-validation";

export const eventFormValidation = (form) => {
  const errors = {};

  for (const key of ["name", "location", "date", "time"]) {
    const val = form[key].trim();
    if (!val) {
      errors[key] = "Заполните все поля";
    } else if (val.length > MAX_LENGTH) {
      errors[key] = `Максимум ${MAX_LENGTH} символов`;
    }
  }

  if (form.date && !DATE_RE.test(form.date.trim())) {
    errors.date = "Формат: ДД.ММ.ГГГГ.";
  }

  if (form.time && !TIME_RE.test(form.time.trim())) {
    errors.time = "Формат: ЧЧ:ММ-ЧЧ:ММ";
  }

  return errors;
};
