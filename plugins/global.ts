import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const formatPrice = (value: number, locale: string = "de-DE", currency: string = "EUR"): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  nuxtApp.provide('formatPrice', formatPrice);
});