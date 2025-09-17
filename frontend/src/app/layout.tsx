import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Murphy - Murphy',
    template: '%s | Murphy',
  },
  description: 'Murphy - 现代化全栈应用',
  keywords: ['React', 'Next.js', 'TypeScript', 'Spring Boot'],
  authors: [{ name: 'Murphy Team' }],
  creator: 'Murphy Team',
  publisher: 'Murphy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://localhost:3000',
    title: 'Murphy - Murphy',
    description: 'Murphy - 现代化全栈应用',
    siteName: 'Murphy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murphy - Murphy',
    description: 'Murphy - 现代化全栈应用',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            locale={zhCN}
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 6,
                fontSize: 14,
              },
              components: {
                Button: {
                  borderRadius: 6,
                },
                Input: {
                  borderRadius: 6,
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}