"use client";

import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import theme from './theme';
import Image from "next/image";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import TableCustom from './components/table';
import TableColumns from './components/table-column';
import SkeletonComponent from './components/skeleton';
import { useVT } from "virtualizedtableforantd4";
import { IData, IDocs } from './interfaces';

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

async function getUserList(page: number, limit: number) {
  return (await fetch(`http://localhost:8081/users?page=${page}&limit=${limit}`).then((res) => res.json())) as IData<IDocs>;
}

export default function Page(): JSX.Element {
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  
  const { data, isLoading } = useQuery({
    queryKey: ["get-user-list", page, pagesize],
    queryFn: function () {
      return getUserList(page, pagesize);
    },
  });

  useEffect(() => {
    if (data) {
      setTotal(data.totalDocs)
      setPagesize(data.limit)
      setPage(data.page)
    }
  }, [data])

  const [vt] = useVT(
    () => ({
      onScroll: async ({ isEnd }) => {
        if (isEnd) {
          if (data?.docs && data?.docs?.length * page < data.totalDocs) {
            setPage(prev => prev + 1)
          }
        }
      },
      scroll: {
        y: 400,
      },
      debug: false
    }),
    [data]
  );

  return (
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

        <SkeletonComponent
          loading={isLoading}
          paragraph={{ rows: 10, width: '100%' }}
        >
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.logos}>
                <TableCustom
                  bordered
                  loading={isLoading}
                  dataSource={data?.docs || []}
                  columns={TableColumns() as any}
                  pagination={{
                    onChange: setPage,
                    total,
                    current: page,
                    onShowSizeChange: (current: number, pageSize: number) => {
                      setPage(current)
                      setPagesize(pageSize)
                    },
                    showTotal: (total: number, range: any) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                  }}
                  scroll={{ y: 400, scrollToFirstRowOnChange: false }}
                  components={vt}
                  scrollToFirstRowOnChange={true}
                />
              </div>
              <Gradient className={styles.backgroundGradient} conic />
            </div>
          </div>
        </SkeletonComponent>

        <div className={styles.grid}>
          bottom
        </div>
      </main>
    </ConfigProvider>
  );
}
