# Raaghu Design System - Localization (i18n) Guide

## Overview

This guide covers the comprehensive internationalization and localization strategy for the Raaghu Component Library, enabling global reach with support for multiple languages, cultures, and regions.

## Table of Contents

- [i18n Philosophy](#i18n-philosophy)
- [Architecture Overview](#architecture-overview)
- [Supported Languages](#supported-languages)
- [Setup and Configuration](#setup-and-configuration)
- [Translation Management](#translation-management)
- [Component Integration](#component-integration)
- [Date and Number Formatting](#date-and-number-formatting)
- [RTL Support](#rtl-support)
- [Pluralization](#pluralization)
- [Context-Aware Translations](#context-aware-translations)
- [Performance Considerations](#performance-considerations)
- [Testing i18n](#testing-i18n)
- [Best Practices](#best-practices)

## i18n Philosophy

Our internationalization approach is built on these core principles:

1. **Universal Design**: Build components that work seamlessly across all cultures and languages
2. **Performance First**: Lazy loading of translations and efficient bundle management
3. **Developer Experience**: Simple APIs that make i18n integration effortless
4. **Cultural Sensitivity**: Support for diverse cultural conventions and preferences
5. **Accessibility**: Ensure i18n doesn't compromise accessibility features

## Architecture Overview

### Core i18n Stack

```json
{
  "react-i18next": "^15.2.0",
  "i18next": "^24.2.0",
  "i18next-browser-languagedetector": "^8.0.2",
  "i18next-http-backend": "^3.0.2",
  "i18next-icu": "^2.3.0"
}
```

### Additional Tools

```json
{
  "i18next-scanner": "^4.5.0",
  "i18next-parser": "^9.0.2",
  "@formatjs/intl": "^2.10.10",
  "date-fns": "^4.8.0",
  "react-hook-form": "^7.54.2"
}
```

## Supported Languages

### Primary Languages (Full Support)

| Language | Code | RTL | Status | Coverage |
|----------|------|-----|--------|----------|
| English | en | No | ✅ Complete | 100% |
| Spanish | es | No | ✅ Complete | 100% |
| French | fr | No | ✅ Complete | 100% |
| German | de | No | ✅ Complete | 100% |
| Chinese (Simplified) | zh-CN | No | ✅ Complete | 100% |
| Japanese | ja | No | ✅ Complete | 100% |
| Arabic | ar | Yes | ✅ Complete | 100% |
| Hebrew | he | Yes | ✅ Complete | 100% |

### Secondary Languages (Partial Support)

| Language | Code | RTL | Status | Coverage |
|----------|------|-----|--------|----------|
| Portuguese | pt | No | 🚧 In Progress | 80% |
| Italian | it | No | 🚧 In Progress | 75% |
| Russian | ru | No | 🚧 In Progress | 70% |
| Korean | ko | No | 📋 Planned | 0% |
| Hindi | hi | No | 📋 Planned | 0% |

## Setup and Configuration

### i18n Configuration

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import ICU from 'i18next-icu';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next)
  .init({
    // Language settings
    lng: 'en', // Default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'de', 'zh-CN', 'ja', 'ar', 'he'],
    
    // Namespace configuration
    ns: ['common', 'components', 'validation', 'dates'],
    defaultNS: 'common',
    
    // Backend configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
      crossDomain: true,
    },
    
    // Language detection
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
      excludeCacheFor: ['cimode'],
    },
    
    // Interpolation
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (format === 'currency') return formatCurrency(value, lng);
        if (format === 'date') return formatDate(value, lng);
        return value;
      },
    },
    
    // Development settings
    debug: process.env.NODE_ENV === 'development',
    saveMissing: process.env.NODE_ENV === 'development',
    
    // React specific
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em'],
    },
  });

export default i18n;
```

### Language Provider Setup

```typescript
// src/components/providers/LanguageProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  currencies: Record<string, string>;
  dateFormats: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(i18n.language);
  const [isRTL, setIsRTL] = useState(RTL_LANGUAGES.includes(i18n.language));

  // Currency mapping by language
  const currencies = {
    en: 'USD',
    es: 'EUR',
    fr: 'EUR',
    de: 'EUR',
    'zh-CN': 'CNY',
    ja: 'JPY',
    ar: 'SAR',
    he: 'ILS'
  };

  // Date format preferences by language
  const dateFormats = {
    en: 'MM/dd/yyyy',
    es: 'dd/MM/yyyy',
    fr: 'dd/MM/yyyy',
    de: 'dd.MM.yyyy',
    'zh-CN': 'yyyy/MM/dd',
    ja: 'yyyy/MM/dd',
    ar: 'dd/MM/yyyy',
    he: 'dd/MM/yyyy'
  };

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    setIsRTL(RTL_LANGUAGES.includes(lang));
    
    // Update document direction
    document.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLanguageState(lng);
      setIsRTL(RTL_LANGUAGES.includes(lng));
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [i18n]);

  // Create RTL cache when needed
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: 'muiltr',
  });

  // Create theme with RTL support
  const theme = createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    typography: {
      fontFamily: isRTL 
        ? 'Arial, "Helvetica Neue", sans-serif' // Better Arabic/Hebrew support
        : 'Roboto, "Helvetica Neue", Arial, sans-serif'
    },
  });

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
    currencies,
    dateFormats
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </CacheProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### App Integration

```typescript
// src/App.tsx
import React, { Suspense } from 'react';
import { LanguageProvider } from './components/providers/LanguageProvider';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './i18n/config';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="App">
            {/* Your app content */}
          </div>
        </Suspense>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
```

## Translation Management

### Translation File Structure

```
public/
  locales/
    en/
      common.json
      components.json
      validation.json
      dates.json
    es/
      common.json
      components.json
      validation.json
      dates.json
    ar/
      common.json
      components.json
      validation.json
      dates.json
```

### Common Translations

```json
// public/locales/en/common.json
{
  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "reset": "Reset",
    "submit": "Submit",
    "close": "Close",
    "open": "Open",
    "expand": "Expand",
    "collapse": "Collapse"
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "settings": "Settings",
    "profile": "Profile",
    "help": "Help",
    "logout": "Logout",
    "back": "Back",
    "next": "Next",
    "previous": "Previous"
  },
  "status": {
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success",
    "warning": "Warning",
    "info": "Information",
    "empty": "No data available",
    "notFound": "Not found"
  },
  "time": {
    "now": "Now",
    "today": "Today",
    "yesterday": "Yesterday",
    "tomorrow": "Tomorrow",
    "thisWeek": "This week",
    "lastWeek": "Last week",
    "thisMonth": "This month",
    "lastMonth": "Last month"
  }
}
```

### Component-Specific Translations

```json
// public/locales/en/components.json
{
  "button": {
    "loading": "Loading...",
    "disabled": "Button is disabled",
    "ariaLabels": {
      "close": "Close dialog",
      "menu": "Open menu",
      "expand": "Expand section"
    }
  },
  "input": {
    "placeholder": "Enter text...",
    "required": "This field is required",
    "invalid": "Please enter a valid value",
    "characterCount": "{{current}} of {{max}} characters"
  },
  "table": {
    "noData": "No data to display",
    "sortBy": "Sort by {{column}}",
    "itemsPerPage": "Items per page:",
    "pagination": {
      "previous": "Previous page",
      "next": "Next page",
      "page": "Page {{page}} of {{total}}"
    },
    "actions": {
      "edit": "Edit row",
      "delete": "Delete row",
      "view": "View details"
    }
  },
  "modal": {
    "close": "Close modal",
    "confirm": "Are you sure?",
    "confirmDelete": "Are you sure you want to delete this item?"
  },
  "form": {
    "validation": {
      "required": "{{field}} is required",
      "email": "Please enter a valid email address",
      "minLength": "{{field}} must be at least {{min}} characters",
      "maxLength": "{{field}} cannot exceed {{max}} characters",
      "pattern": "{{field}} format is invalid"
    },
    "placeholders": {
      "email": "Enter your email",
      "password": "Enter your password",
      "firstName": "Enter your first name",
      "lastName": "Enter your last name",
      "phone": "Enter your phone number"
    }
  }
}
```

### Validation Messages

```json
// public/locales/en/validation.json
{
  "field": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "password": {
      "minLength": "Password must be at least 8 characters long",
      "uppercase": "Password must contain at least one uppercase letter",
      "lowercase": "Password must contain at least one lowercase letter",
      "number": "Password must contain at least one number",
      "special": "Password must contain at least one special character"
    },
    "phone": "Please enter a valid phone number",
    "url": "Please enter a valid URL",
    "date": "Please enter a valid date",
    "number": {
      "invalid": "Please enter a valid number",
      "min": "Number must be at least {{min}}",
      "max": "Number cannot exceed {{max}}",
      "positive": "Number must be positive"
    }
  },
  "file": {
    "tooBig": "File size cannot exceed {{maxSize}}",
    "wrongType": "File type {{type}} is not supported",
    "uploadError": "Failed to upload file"
  }
}
```

## Component Integration

### Using Translations in Components

```typescript
// src/raaghu-elements/rds-button/rds-button.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress } from '@mui/material';
import { useLanguage } from '../../components/providers/LanguageProvider';

interface RdsButtonProps {
  label?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  translationKey?: string;
  translationNamespace?: string;
}

const RdsButton: React.FC<RdsButtonProps> = ({
  label,
  children,
  isLoading = false,
  loadingText,
  variant = 'contained',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
  translationKey,
  translationNamespace = 'components',
  ...props
}) => {
  const { t } = useTranslation(translationNamespace);
  const { isRTL } = useLanguage();

  // Determine button text
  const getButtonText = () => {
    if (isLoading) {
      return loadingText || t('button.loading');
    }
    
    if (translationKey) {
      return t(translationKey);
    }
    
    return label || children;
  };

  // Determine aria-label
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (disabled) return t('button.disabled');
    if (typeof getButtonText() === 'string') return getButtonText() as string;
    return undefined;
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      aria-label={getAriaLabel()}
      dir={isRTL ? 'rtl' : 'ltr'}
      {...props}
    >
      {isLoading && (
        <CircularProgress 
          size={16} 
          sx={{ 
            mr: isRTL ? 0 : 1, 
            ml: isRTL ? 1 : 0 
          }} 
        />
      )}
      {getButtonText()}
    </Button>
  );
};

export default RdsButton;
```

### Form Components with i18n

```typescript
// src/raaghu-elements/rds-text-field/rds-text-field.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps } from '@mui/material';
import { useLanguage } from '../../components/providers/LanguageProvider';

interface RdsTextFieldProps extends Omit<TextFieldProps, 'label' | 'placeholder' | 'helperText'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  translationKeys?: {
    label?: string;
    placeholder?: string;
    helperText?: string;
  };
  translationNamespace?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const RdsTextField: React.FC<RdsTextFieldProps> = ({
  label,
  placeholder,
  helperText,
  translationKeys,
  translationNamespace = 'components',
  required = false,
  error = false,
  errorMessage,
  ...props
}) => {
  const { t } = useTranslation([translationNamespace, 'validation']);
  const { isRTL } = useLanguage();

  // Get translated texts
  const getLabel = () => {
    if (translationKeys?.label) return t(translationKeys.label);
    return label;
  };

  const getPlaceholder = () => {
    if (translationKeys?.placeholder) return t(translationKeys.placeholder);
    return placeholder;
  };

  const getHelperText = () => {
    if (error && errorMessage) return errorMessage;
    if (translationKeys?.helperText) return t(translationKeys.helperText);
    return helperText;
  };

  return (
    <TextField
      {...props}
      label={getLabel()}
      placeholder={getPlaceholder()}
      helperText={getHelperText()}
      required={required}
      error={error}
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{
        '& .MuiInputLabel-root': {
          transformOrigin: isRTL ? 'top right' : 'top left',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
          textAlign: isRTL ? 'right' : 'left',
        },
        ...props.sx,
      }}
    />
  );
};

export default RdsTextField;
```

### Hook for Component i18n

```typescript
// src/hooks/useComponentTranslation.ts
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../components/providers/LanguageProvider';

interface UseComponentTranslationOptions {
  namespace?: string;
  keyPrefix?: string;
}

export const useComponentTranslation = (
  componentName: string,
  options: UseComponentTranslationOptions = {}
) => {
  const { namespace = 'components', keyPrefix } = options;
  const { t, i18n } = useTranslation(namespace);
  const { isRTL, language } = useLanguage();

  const getTranslation = (key: string, defaultValue?: string, interpolation?: any) => {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : `${componentName}.${key}`;
    return t(fullKey, defaultValue, interpolation);
  };

  const formatMessage = (key: string, values?: Record<string, any>) => {
    return getTranslation(key, undefined, values);
  };

  const hasTranslation = (key: string) => {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : `${componentName}.${key}`;
    return i18n.exists(fullKey);
  };

  return {
    t: getTranslation,
    formatMessage,
    hasTranslation,
    isRTL,
    language,
    componentName
  };
};

// Usage example
const MyComponent = () => {
  const { t, isRTL } = useComponentTranslation('button');
  
  return (
    <button dir={isRTL ? 'rtl' : 'ltr'}>
      {t('loading', 'Loading...')}
    </button>
  );
};
```

## Date and Number Formatting

### Date Formatting Utilities

```typescript
// src/utils/i18n/dateFormatter.ts
import { format, parseISO } from 'date-fns';
import { 
  enUS, es, fr, de, zhCN, ja, ar, he 
} from 'date-fns/locale';

const localeMap = {
  en: enUS,
  es: es,
  fr: fr,
  de: de,
  'zh-CN': zhCN,
  ja: ja,
  ar: ar,
  he: he
};

export class DateFormatter {
  private locale: string;
  private dateLocale: Locale;

  constructor(locale: string) {
    this.locale = locale;
    this.dateLocale = localeMap[locale as keyof typeof localeMap] || enUS;
  }

  format(date: Date | string, formatString?: string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    const defaultFormats = {
      en: 'MM/dd/yyyy',
      es: 'dd/MM/yyyy',
      fr: 'dd/MM/yyyy',
      de: 'dd.MM.yyyy',
      'zh-CN': 'yyyy/MM/dd',
      ja: 'yyyy年MM月dd日',
      ar: 'dd/MM/yyyy',
      he: 'dd/MM/yyyy'
    };

    const formatStr = formatString || defaultFormats[this.locale as keyof typeof defaultFormats] || 'MM/dd/yyyy';
    
    return format(dateObj, formatStr, { locale: this.dateLocale });
  }

  formatTime(date: Date | string, is24Hour?: boolean): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const format24 = is24Hour ?? this.is24HourFormat();
    
    return format(dateObj, format24 ? 'HH:mm' : 'h:mm a', { 
      locale: this.dateLocale 
    });
  }

  formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    const dateFormats = {
      en: 'MMM d, yyyy h:mm a',
      es: 'd MMM yyyy HH:mm',
      fr: 'd MMM yyyy HH:mm',
      de: 'd. MMM yyyy HH:mm',
      'zh-CN': 'yyyy年MM月dd日 HH:mm',
      ja: 'yyyy年MM月dd日 HH:mm',
      ar: 'd MMM yyyy h:mm a',
      he: 'd בMMM yyyy h:mm a'
    };

    const formatStr = dateFormats[this.locale as keyof typeof dateFormats] || 'MMM d, yyyy h:mm a';
    
    return format(dateObj, formatStr, { locale: this.dateLocale });
  }

  formatRelative(date: Date | string): string {
    // Implementation for relative date formatting
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return this.t('time.now');
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return this.format(dateObj);
  }

  private is24HourFormat(): boolean {
    const format24Countries = ['de', 'fr', 'es', 'zh-CN', 'ja'];
    return format24Countries.includes(this.locale);
  }

  private t(key: string): string {
    // This would integrate with your i18n system
    return key; // Simplified for example
  }
}

// Hook for date formatting
export const useDateFormatter = () => {
  const { language } = useLanguage();
  return new DateFormatter(language);
};
```

### Number and Currency Formatting

```typescript
// src/utils/i18n/numberFormatter.ts
export class NumberFormatter {
  private locale: string;
  private currency: string;

  constructor(locale: string, currency?: string) {
    this.locale = locale;
    this.currency = currency || this.getDefaultCurrency(locale);
  }

  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(number);
  }

  formatCurrency(amount: number, currency?: string): string {
    const currencyCode = currency || this.currency;
    
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  formatPercentage(value: number, decimals: number = 1): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  formatCompactNumber(number: number): string {
    return new Intl.NumberFormat(this.locale, {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(number);
  }

  formatFileSize(bytes: number): string {
    const sizes = {
      en: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      es: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      fr: ['Octets', 'Ko', 'Mo', 'Go', 'To'],
      de: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      'zh-CN': ['字节', 'KB', 'MB', 'GB', 'TB'],
      ja: ['バイト', 'KB', 'MB', 'GB', 'TB'],
      ar: ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'],
      he: ['בתים', 'KB', 'MB', 'GB', 'TB']
    };

    if (bytes === 0) return `0 ${sizes[this.locale as keyof typeof sizes]?.[0] || 'Bytes'}`;
    
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    const unit = sizes[this.locale as keyof typeof sizes]?.[i] || sizes.en[i];
    
    return `${this.formatNumber(size)} ${unit}`;
  }

  private getDefaultCurrency(locale: string): string {
    const currencyMap = {
      en: 'USD',
      es: 'EUR',
      fr: 'EUR',
      de: 'EUR',
      'zh-CN': 'CNY',
      ja: 'JPY',
      ar: 'SAR',
      he: 'ILS'
    };
    
    return currencyMap[locale as keyof typeof currencyMap] || 'USD';
  }
}

// Hook for number formatting
export const useNumberFormatter = () => {
  const { language, currencies } = useLanguage();
  const currency = currencies[language] || 'USD';
  
  return new NumberFormatter(language, currency);
};
```

## RTL Support

### RTL-Aware Components

```typescript
// src/components/layout/RtlAwareContainer.tsx
import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useLanguage } from '../providers/LanguageProvider';

interface RtlAwareContainerProps extends BoxProps {
  children: React.ReactNode;
  flipHorizontally?: boolean;
}

export const RtlAwareContainer: React.FC<RtlAwareContainerProps> = ({
  children,
  flipHorizontally = false,
  sx = {},
  ...props
}) => {
  const { isRTL } = useLanguage();

  const rtlStyles = {
    direction: isRTL ? 'rtl' : 'ltr',
    ...(flipHorizontally && isRTL && {
      transform: 'scaleX(-1)',
    }),
    ...sx,
  };

  return (
    <Box sx={rtlStyles} {...props}>
      {children}
    </Box>
  );
};
```

### RTL-Aware Styling Utilities

```typescript
// src/utils/rtl/styling.ts
import { useLanguage } from '../../components/providers/LanguageProvider';

export const useRtlStyles = () => {
  const { isRTL } = useLanguage();

  return {
    marginStart: (value: number | string) => ({
      marginLeft: isRTL ? 0 : value,
      marginRight: isRTL ? value : 0,
    }),
    marginEnd: (value: number | string) => ({
      marginLeft: isRTL ? value : 0,
      marginRight: isRTL ? 0 : value,
    }),
    paddingStart: (value: number | string) => ({
      paddingLeft: isRTL ? 0 : value,
      paddingRight: isRTL ? value : 0,
    }),
    paddingEnd: (value: number | string) => ({
      paddingLeft: isRTL ? value : 0,
      paddingRight: isRTL ? 0 : value,
    }),
    start: (value: number | string) => ({
      left: isRTL ? 'auto' : value,
      right: isRTL ? value : 'auto',
    }),
    end: (value: number | string) => ({
      left: isRTL ? value : 'auto',
      right: isRTL ? 'auto' : value,
    }),
    borderStart: (border: string) => ({
      borderLeft: isRTL ? 'none' : border,
      borderRight: isRTL ? border : 'none',
    }),
    borderEnd: (border: string) => ({
      borderLeft: isRTL ? border : 'none',
      borderRight: isRTL ? 'none' : border,
    }),
    textAlign: isRTL ? 'right' : 'left',
    isRTL,
  };
};

// Usage example
const MyComponent = () => {
  const rtl = useRtlStyles();
  
  return (
    <div style={{
      ...rtl.marginStart(16),
      ...rtl.paddingEnd(8),
      textAlign: rtl.textAlign
    }}>
      Content
    </div>
  );
};
```

### RTL Icon Management

```typescript
// src/components/icons/RtlAwareIcon.tsx
import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { useLanguage } from '../providers/LanguageProvider';

interface RtlAwareIconProps extends SvgIconProps {
  flipForRtl?: boolean;
}

export const RtlAwareIcon: React.FC<RtlAwareIconProps> = ({
  children,
  flipForRtl = false,
  sx = {},
  ...props
}) => {
  const { isRTL } = useLanguage();

  const iconStyles = {
    ...(flipForRtl && isRTL && {
      transform: 'scaleX(-1)',
    }),
    ...sx,
  };

  return (
    <SvgIcon sx={iconStyles} {...props}>
      {children}
    </SvgIcon>
  );
};

// Directional icons that should flip in RTL
export const ArrowForward = (props: SvgIconProps) => (
  <RtlAwareIcon flipForRtl {...props}>
    <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </RtlAwareIcon>
);

export const ArrowBack = (props: SvgIconProps) => (
  <RtlAwareIcon flipForRtl {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </RtlAwareIcon>
);
```

## Pluralization

### Pluralization Rules

```json
// public/locales/en/common.json
{
  "itemCount": "{{count}} item",
  "itemCount_plural": "{{count}} items",
  "fileUpload": {
    "single": "Upload {{count}} file",
    "multiple": "Upload {{count}} files"
  },
  "timeAgo": {
    "minute": "{{count}} minute ago",
    "minute_plural": "{{count}} minutes ago",
    "hour": "{{count}} hour ago",  
    "hour_plural": "{{count}} hours ago",
    "day": "{{count}} day ago",
    "day_plural": "{{count}} days ago"
  }
}
```

### Advanced Pluralization with ICU

```json
// public/locales/en/components.json
{
  "notification": {
    "message": "{count, plural, =0 {No new messages} =1 {One new message} other {{count} new messages}}",
    "task": "{count, plural, =0 {No tasks} =1 {One task remaining} other {{count} tasks remaining}}"
  }
}
```

### Pluralization Hook

```typescript
// src/hooks/usePluralization.ts
import { useTranslation } from 'react-i18next';

export const usePluralization = (namespace: string = 'common') => {
  const { t } = useTranslation(namespace);

  const pluralize = (
    key: string,
    count: number,
    options?: any
  ) => {
    return t(key, { count, ...options });
  };

  const formatCount = (
    baseKey: string,
    count: number,
    showZero: boolean = true
  ) => {
    if (count === 0 && !showZero) {
      return t(`${baseKey}.empty`, 'No items');
    }
    
    return pluralize(baseKey, count);
  };

  return {
    pluralize,
    formatCount
  };
};

// Usage example
const NotificationBadge = ({ count }: { count: number }) => {
  const { formatCount } = usePluralization('components');
  
  return (
    <span>
      {formatCount('notification.message', count)}
    </span>
  );
};
```

## Context-Aware Translations

### Context Provider for Translations

```typescript
// src/components/providers/TranslationContextProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationContextType {
  context: string;
  setContext: (context: string) => void;
  tWithContext: (key: string, fallback?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationContextProviderProps {
  children: ReactNode;
  initialContext?: string;
}

export const TranslationContextProvider: React.FC<TranslationContextProviderProps> = ({
  children,
  initialContext = ''
}) => {
  const [context, setContext] = React.useState(initialContext);
  const { t } = useTranslation();

  const tWithContext = (key: string, fallback?: string) => {
    const contextKey = context ? `${context}.${key}` : key;
    const result = t(contextKey, { defaultValue: undefined });
    
    // If context-specific translation doesn't exist, fall back to base key
    if (result === contextKey) {
      return t(key, fallback || key);
    }
    
    return result;
  };

  const value: TranslationContextType = {
    context,
    setContext,
    tWithContext
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationContextProvider');
  }
  return context;
};
```

## Performance Considerations

### Lazy Loading Translations

```typescript
// src/i18n/lazyLoader.ts
export const loadTranslations = async (language: string, namespace: string) => {
  try {
    const translation = await import(`../../public/locales/${language}/${namespace}.json`);
    return translation.default;
  } catch (error) {
    console.warn(`Failed to load translation: ${language}/${namespace}`, error);
    // Fallback to English
    const fallback = await import(`../../public/locales/en/${namespace}.json`);
    return fallback.default;
  }
};

// Preload critical translations
export const preloadCriticalTranslations = async () => {
  const criticalNamespaces = ['common', 'components'];
  const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
  
  await Promise.all(
    criticalNamespaces.map(namespace =>
      loadTranslations(currentLanguage, namespace)
    )
  );
};
```

### Translation Caching

```typescript
// src/utils/i18n/translationCache.ts
class TranslationCache {
  private cache: Map<string, any> = new Map();
  private maxSize: number = 1000;

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any): void {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const translationCache = new TranslationCache();
```

## Testing i18n

### Translation Testing Utilities

```typescript
// src/test-utils/i18n.ts
import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

// Create a test i18n instance
const createTestI18n = (language: string = 'en') => {
  const testI18n = i18n.createInstance();
  
  testI18n.init({
    lng: language,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: {
        common: {
          'actions.save': 'Save',
          'actions.cancel': 'Cancel',
          'status.loading': 'Loading...',
        },
        components: {
          'button.loading': 'Loading...',
          'input.required': 'This field is required',
        }
      },
      es: {
        common: {
          'actions.save': 'Guardar',
          'actions.cancel': 'Cancelar',
          'status.loading': 'Cargando...',
        }
      }
    }
  });

  return testI18n;
};

interface RenderWithI18nOptions extends Omit<RenderOptions, 'wrapper'> {
  language?: string;
}

export const renderWithI18n = (
  ui: React.ReactElement,
  options: RenderWithI18nOptions = {}
) => {
  const { language = 'en', ...renderOptions } = options;
  const testI18n = createTestI18n(language);

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={testI18n}>
      {children}
    </I18nextProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
```

### Component i18n Tests

```typescript
// src/raaghu-elements/rds-button/rds-button.test.tsx
import { renderWithI18n } from '../../test-utils/i18n';
import { screen, fireEvent } from '@testing-library/react';
import RdsButton from './rds-button';

describe('RdsButton i18n', () => {
  it('displays text in English by default', () => {
    renderWithI18n(<RdsButton isLoading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays text in Spanish when language is set to es', () => {
    renderWithI18n(<RdsButton isLoading />, { language: 'es' });
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('uses translation key when provided', () => {
    renderWithI18n(
      <RdsButton 
        translationKey="actions.save" 
        translationNamespace="common"
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('falls back to English when translation is missing', () => {
    renderWithI18n(
      <RdsButton 
        translationKey="missing.key" 
        translationNamespace="common"
      />, 
      { language: 'fr' }
    );
    // Should fall back to key or default value
    expect(screen.getByText('missing.key')).toBeInTheDocument();
  });
});
```

## Best Practices

### Translation Key Naming

```typescript
// Good naming conventions
const translationKeys = {
  // Hierarchical structure
  'components.button.loading': 'Loading...',
  'components.input.validation.required': 'This field is required',
  
  // Action-based naming
  'actions.user.create': 'Create User',
  'actions.user.edit': 'Edit User',
  'actions.user.delete': 'Delete User',
  
  // Status-based naming
  'status.data.loading': 'Loading data...',
  'status.data.error': 'Failed to load data',
  'status.data.empty': 'No data available',
  
  // Context-specific naming
  'pages.dashboard.welcome': 'Welcome to Dashboard',
  'pages.profile.settings': 'Profile Settings',
};
```

### Translation Guidelines

1. **Keep translations short and clear**
2. **Use consistent terminology**
3. **Provide context for translators**
4. **Test with longer translations**
5. **Consider cultural differences**

### Performance Best Practices

1. **Lazy load translations**
2. **Cache frequently used translations**
3. **Minimize translation bundle sizes**
4. **Use namespace splitting**
5. **Preload critical translations**

---

## Quick Reference

### Essential Hooks

```typescript
// Basic translation
const { t } = useTranslation();

// Multiple namespaces
const { t } = useTranslation(['common', 'components']);

// Language and RTL info
const { language, isRTL, setLanguage } = useLanguage();

// Component-specific translations
const { t } = useComponentTranslation('button');

// Date and number formatting
const dateFormatter = useDateFormatter();
const numberFormatter = useNumberFormatter();
```

### Common Translation Patterns

```typescript
// Simple translation
t('actions.save')

// With interpolation
t('greeting', { name: 'John' })

// With pluralization
t('itemCount', { count: 5 })

// With default value
t('missing.key', 'Default text')

// With namespace
t('components:button.loading')
```

This comprehensive localization guide ensures our component library provides excellent international user experience across all supported languages and cultures.
