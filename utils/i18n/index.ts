/**
 * Internationalization system for Raaghu Design System
 * Supports multiple languages and RTL layouts
 */

// Locale interface
export interface Locale {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  numberFormat: Intl.NumberFormatOptions;
}

// Translation interface
export interface Translation {
  [key: string]: string | Translation;
}

// Supported locales
export const SUPPORTED_LOCALES: Record<string, Locale> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    dateFormat: 'MM/dd/yyyy',
    numberFormat: { style: 'decimal' },
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    numberFormat: { style: 'decimal' },
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    numberFormat: { style: 'decimal' },
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    dateFormat: 'dd.MM.yyyy',
    numberFormat: { style: 'decimal' },
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    dateFormat: 'dd/MM/yyyy',
    numberFormat: { style: 'decimal' },
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    dateFormat: 'yyyy-MM-dd',
    numberFormat: { style: 'decimal' },
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    dateFormat: 'yyyy/MM/dd',
    numberFormat: { style: 'decimal' },
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    dateFormat: 'yyyy.MM.dd',
    numberFormat: { style: 'decimal' },
  },
};

// Default translations for common UI elements
export const DEFAULT_TRANSLATIONS: Record<string, Translation> = {
  en: {
    common: {
      ok: 'OK',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      reset: 'Reset',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
    },
    button: {
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      finish: 'Finish',
    },
    form: {
      required: 'This field is required',
      invalid: 'Please enter a valid value',
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters',
      confirm: 'Passwords do not match',
    },
    table: {
      noData: 'No data available',
      itemsPerPage: 'Items per page',
      page: 'Page',
      of: 'of',
      rows: 'rows',
    },
    pagination: {
      first: 'First',
      last: 'Last',
      next: 'Next',
      previous: 'Previous',
    },
    accessibility: {
      expand: 'Expand',
      collapse: 'Collapse',
      menu: 'Menu',
      close: 'Close',
      open: 'Open',
    },
  },
  es: {
    common: {
      ok: 'Aceptar',
      cancel: 'Cancelar',
      close: 'Cerrar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Añadir',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpiar',
      reset: 'Restablecer',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información',
    },
    button: {
      submit: 'Enviar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      finish: 'Finalizar',
    },
    form: {
      required: 'Este campo es obligatorio',
      invalid: 'Por favor ingrese un valor válido',
      email: 'Por favor ingrese una dirección de correo válida',
      password: 'La contraseña debe tener al menos 8 caracteres',
      confirm: 'Las contraseñas no coinciden',
    },
    table: {
      noData: 'No hay datos disponibles',
      itemsPerPage: 'Elementos por página',
      page: 'Página',
      of: 'de',
      rows: 'filas',
    },
    pagination: {
      first: 'Primero',
      last: 'Último',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    accessibility: {
      expand: 'Expandir',
      collapse: 'Contraer',
      menu: 'Menú',
      close: 'Cerrar',
      open: 'Abrir',
    },
  },
};

// Internationalization Manager
export class I18nManager {
  private static currentLocale: string = 'en';
  private static translations: Record<string, Translation> = { ...DEFAULT_TRANSLATIONS };
  private static fallbackLocale: string = 'en';

  // Set current locale
  static setLocale(locale: string): void {
    if (SUPPORTED_LOCALES[locale]) {
      this.currentLocale = locale;
      this.updateDocumentDirection();
      this.updateDocumentLang();
    } else {
      console.warn(`Locale '${locale}' is not supported. Available locales:`, Object.keys(SUPPORTED_LOCALES));
    }
  }

  // Get current locale
  static getLocale(): string {
    return this.currentLocale;
  }

  // Get locale information
  static getLocaleInfo(locale?: string): Locale {
    const localeCode = locale || this.currentLocale;
    return SUPPORTED_LOCALES[localeCode] || SUPPORTED_LOCALES[this.fallbackLocale];
  }

  // Add translations
  static addTranslations(locale: string, translations: Translation): void {
    if (!this.translations[locale]) {
      this.translations[locale] = {};
    }
    this.translations[locale] = this.mergeTranslations(this.translations[locale], translations);
  }

  // Get translation by key
  static t(key: string, locale?: string): string {
    const localeCode = locale || this.currentLocale;
    const translation = this.getNestedValue(this.translations[localeCode], key);
    
    if (translation) {
      return translation;
    }
    
    // Fallback to default locale
    if (localeCode !== this.fallbackLocale) {
      const fallbackTranslation = this.getNestedValue(this.translations[this.fallbackLocale], key);
      if (fallbackTranslation) {
        return fallbackTranslation;
      }
    }
    
    // Return key if no translation found
    console.warn(`Translation not found for key: ${key} in locale: ${localeCode}`);
    return key;
  }

  // Format number according to locale
  static formatNumber(value: number, locale?: string): string {
    const localeCode = locale || this.currentLocale;
    const localeInfo = this.getLocaleInfo(localeCode);
    
    try {
      return value.toLocaleString(localeCode, localeInfo.numberFormat);
    } catch {
      return value.toString();
    }
  }

  // Format date according to locale
  static formatDate(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string {
    const localeCode = locale || this.currentLocale;
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formatterOptions = { ...defaultOptions, ...options };
    
    try {
      return date.toLocaleDateString(localeCode, formatterOptions);
    } catch {
      return date.toLocaleDateString();
    }
  }

  // Format currency according to locale
  static formatCurrency(value: number, currency: string, locale?: string): string {
    const localeCode = locale || this.currentLocale;
    
    try {
      return value.toLocaleString(localeCode, {
        style: 'currency',
        currency,
      });
    } catch {
      return `${currency} ${value}`;
    }
  }

  // Check if locale is RTL
  static isRTL(locale?: string): boolean {
    const localeCode = locale || this.currentLocale;
    return this.getLocaleInfo(localeCode).direction === 'rtl';
  }

  // Get list of available locales
  static getAvailableLocales(): Locale[] {
    return Object.values(SUPPORTED_LOCALES);
  }

  // Private helper methods
  private static getNestedValue(obj: any, key: string): string | undefined {
    return key.split('.').reduce((current, k) => current?.[k], obj);
  }

  private static mergeTranslations(target: Translation, source: Translation): Translation {
    const result = { ...target };
    
    Object.keys(source).forEach(key => {
      if (typeof source[key] === 'object' && typeof target[key] === 'object') {
        result[key] = this.mergeTranslations(target[key] as Translation, source[key] as Translation);
      } else {
        result[key] = source[key];
      }
    });
    
    return result;
  }

  private static updateDocumentDirection(): void {
    if (typeof document !== 'undefined') {
      const direction = this.isRTL() ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', direction);
    }
  }

  private static updateDocumentLang(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', this.currentLocale);
    }
  }
}

// Utility functions
export const t = (key: string, locale?: string): string => I18nManager.t(key, locale);
export const formatNumber = (value: number, locale?: string): string => I18nManager.formatNumber(value, locale);
export const formatDate = (date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string => 
  I18nManager.formatDate(date, locale, options);
export const formatCurrency = (value: number, currency: string, locale?: string): string => 
  I18nManager.formatCurrency(value, currency, locale);
export const isRTL = (locale?: string): boolean => I18nManager.isRTL(locale);

// Export everything
export default {
  I18nManager,
  SUPPORTED_LOCALES,
  DEFAULT_TRANSLATIONS,
  t,
  formatNumber,
  formatDate,
  formatCurrency,
  isRTL,
};
