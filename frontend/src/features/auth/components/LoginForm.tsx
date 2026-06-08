import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../api";
import { t, setLocale, getLocale, onLocaleChange, type Locale } from "../../../i18n";
import { useAuthStore } from "../../auth/auth.store";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>();

  const [locale, setLocaleState] = useState<Locale>(getLocale())

  const handleChangeLocale = (l: Locale) => {
    setLocale(l)
    setLocaleState(l)
  }

  useEffect(() => {
    const unsub = onLocaleChange((l) => setLocaleState(l))
    return unsub
  }, [])

  const setToken = useAuthStore((s) => s.setToken)
  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      // extract token from response (flexible keys)
      const token = (response && (response.token || response.accessToken || response.access_token)) ?? null
      if (token) {
        setToken(token)
        navigate('/')
        return
      }
      console.log('login response (no token):', response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-primary-text)' }}>
          {t('auth.login')}
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

      <button
        className="text-white p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {t('auth.login')}
      </button>
    </form>
  );
}