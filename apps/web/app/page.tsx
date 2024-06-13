"use client";

import React from 'react';
import { ConfigProvider } from 'antd';
import theme from './theme';
import Image from "next/image";
import styles from "./page.module.css";
import GradientBackground from './components/core/gradient-background';
import ErrorBoundary from './ErrorBoundary';
import DemoComponent from './components/feature';

export default function Page(): JSX.Element {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={theme}>
        <main className={styles.main}>
          <div className={styles.description}>
            <div>
              <a
                href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
                rel="noopener noreferrer"
                target="_blank"
              >
                By{" "}
                <Image
                  alt="Vercel Logo"
                  className={styles.vercelLogo}
                  height={24}
                  priority
                  src="/vercel.svg"
                  width={100}
                />
              </a>
            </div>
          </div>

          <DemoComponent
            styles={styles}
          />
          <GradientBackground className={styles.backgroundGradient} conic styles={styles} />

          {/* <div className={styles.grid}>
            bottom
          </div> */}
        </main>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
