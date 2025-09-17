import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Architecture overview sidebar
  architectureSidebar: [
    {
      type: 'category',
      label: '架构概览',
      items: [
        'architecture/overview',
        'architecture/getting-started',
        'architecture/deployment',
      ],
    },
    {
      type: 'category',
      label: '开发指南',
      items: [
        'architecture/development-guide',
        'architecture/best-practices',
        'architecture/troubleshooting',
      ],
    },
  ],

  // Frontend framework sidebar
  frontendSidebar: [
    {
      type: 'category',
      label: 'Next.js 15 前端框架',
      items: [
        'frontend/introduction',
        'frontend/architecture',
        'frontend/development',
        'frontend/components',
        'frontend/state-management',
        'frontend/styling',
        'frontend/testing',
        'frontend/deployment',
      ],
    },
    {
      type: 'category',
      label: '开发工具',
      items: [
        'frontend/tools/typescript',
        'frontend/tools/eslint',
        'frontend/tools/prettier',
        'frontend/tools/testing-tools',
      ],
    },
  ],

  // Backend framework sidebar
  backendSidebar: [
    {
      type: 'category',
      label: 'Spring Boot MVC 后端',
      items: [
        'backend/mvc/introduction',
        'backend/mvc/architecture',
        'backend/mvc/development',
        'backend/mvc/database',
        'backend/mvc/api-design',
        'backend/mvc/testing',
        'backend/mvc/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Spring Boot WebFlux 后端',
      items: [
        'backend/webflux/introduction',
        'backend/webflux/architecture',
        'backend/webflux/development',
        'backend/webflux/reactive-programming',
        'backend/webflux/database',
        'backend/webflux/testing',
        'backend/webflux/deployment',
      ],
    },
    {
      type: 'category',
      label: '通用组件',
      items: [
        'backend/common/docker',
        'backend/common/database',
        'backend/common/monitoring',
        'backend/common/security',
      ],
    },
  ],
};

export default sidebars;
