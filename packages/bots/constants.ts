/**
 * CLIENT_ID - Идентификатор приложения
 *
 * CLIENT_SECRET - Защищенный ключ приложения (указан в настройках приложения)
 *
 * REDIRECT_URI - URL, который использовался при получении code на первом этапе авторизации.
 * Должен быть аналогичен переданному при авторизации.
 *
 * DOMAIN - домен приложения (https://example.com)
 */
export const {
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, DOMAIN,
} = process.env;
