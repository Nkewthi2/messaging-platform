import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { t, setLocale, getLocale, onLocaleChange, type Locale } from "../../../i18n";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {

  const {
    register,
    handleSubmit,
  } = useForm<RegisterFormData>();

  const [locale, setLocaleState] = useState<Locale>(getLocale())

  const handleChangeLocale = (l: Locale) => {
    setLocale(l)
    setLocaleState(l)
  }

  useEffect(() => {
    const unsub = onLocaleChange((l) => setLocaleState(l))
    return unsub
  }, [])

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-primary-text)' }}>
          {t('auth.register')}
        </h1>
      </div>

      <input
        {...register("username")}
        placeholder={t('auth.username')}
        className="p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)', border: '1px solid var(--color-border)' }}
      />

      <input
        {...register("password")}
        type="password"
        placeholder={t('auth.password')}
        className="p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)', border: '1px solid var(--color-border)' }}
      />

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder={t('auth.confirmPassword')}
        className="p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)', border: '1px solid var(--color-border)' }}
      />

      <button
        className="text-white p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {t('auth.register')}
      </button>
    </form>
  );
}