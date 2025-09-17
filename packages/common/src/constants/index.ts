// API相关常量
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout', 
    REFRESH: '/api/auth/refresh',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile'
  },
  USERS: {
    LIST: '/api/users',
    DETAIL: '/api/users/:id',
    CREATE: '/api/users',
    UPDATE: '/api/users/:id',
    DELETE: '/api/users/:id'
  }
} as const;

// HTTP状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE: 0,
    DEFAULT_SIZE: 20,
    MAX_SIZE: 100
  },
  TOKEN: {
    ACCESS_TOKEN_EXPIRY: 3600, // 1 hour in seconds
    REFRESH_TOKEN_EXPIRY: 2592000 // 30 days in seconds
  }
} as const;

// 环境变量键名
export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  API_BASE_URL: 'NEXT_PUBLIC_API_URL'
} as const;