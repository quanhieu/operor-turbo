"use client";

import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from './theme';
import Image from "next/image";
import { Card } from "@repo/ui/card";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import TableCustom from './components/table';
import TableColumns from './components/table-column';

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

interface IData<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  limit: number;
  offset: number;
}

interface IMeeting {
  _id: string;
  start_day: number;
  end_day: number;
}

interface IDocs {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  days: number;
  meetings: IMeeting[];
  meeting_days: string[];
  total_days_without_meeting: number;
}

async function getUserList(page: number, limit: number) {
  return (await fetch(`http://localhost:8081/users?page=${page}&limit=${limit}`).then((res) => res.json())) as IData<IDocs>;
}

export default function Page(): JSX.Element {
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  
  const { data, isLoading } = useQuery({
    queryKey: ["get-user-list"],
    queryFn: function () {
      return getUserList(page, pagesize);
    },
  });
  console.log('aaaa ', data);

  useEffect(() => {
    if (data) {
      setTotal(data.totalDocs)
      setPagesize(data.limit)
      setPage(data.page)
    }
  }, [])
  console.log(data);

  return (
    <ConfigProvider theme={theme}>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            {/* <Code className={styles.code}>{data?.message ?? "..."}</Code> */}
          </p>
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

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.logos}>
              <TableCustom
                loading={isLoading}
                dataSource={data?.docs as any[]}
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
                  pageSizeOptions: [10, 50, 100, 200],
                  pageSize: pagesize,
                }}
              />
            </div>
            <Gradient className={styles.backgroundGradient} conic />
          </div>
        </div>

        <div className={styles.grid}>
          bottom
        </div>
      </main>
    </ConfigProvider>
  );
}
