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
          <DemoComponent
            styles={styles}
          />
          <GradientBackground className={styles.backgroundGradient} conic styles={styles} />
        </main>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
