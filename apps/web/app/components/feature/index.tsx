import { useEffect, useRef, useState } from "react";
import { Space, Spin, Switch } from "antd";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { getUserList } from "../../services/user";
import TableDemo from "./demo-table";
import DemoCardComponent from "./demo-card";
import { IDocs } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";

export default function DemoComponent({ styles }: { styles: any}) {
  const [loadedData, setLoadedData] = useState<IDocs[] | undefined>([])
  const [isCheck, setIsCheck] = useState(false)
  const [pagination, setPagination] = useState<{page: number, pagesize: number}>({
    page: 1,
    pagesize: 10,
  })
  const totalRecord = useRef(0)

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-list", pagination.page, pagination.pagesize],
    queryFn: function () {
      return getUserList(pagination.page, pagination.pagesize);
    },
  });

  useEffect(() => {
    if (data) {
      totalRecord.current = data.totalDocs
      setPagination({
        page: data.page,
        pagesize: data.limit
      })
      setLoadedData(
        prev => prev ? [...prev, ...data.docs] : data.docs
      )
    }
  }, [data])

  useEffect(() => {
    if (isCheck) {
      setLoadedData([])
      setPagination((prev) => ({
        ...prev,
        page: 1
      }))
    }
  }, [isCheck])

  return (
    <div className={styles.hero}>
      <Segmented
        options={[
          { label: 'List', value: false, icon: <AppstoreOutlined /> },
          { label: 'Table', value: true, icon: <BarsOutlined /> },
        ]}
        value={isCheck}
        onChange={(value) => setIsCheck(value)}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}
        size="large"
      />
      <div className={styles.heroContent}>
        <div className={styles.logos}>
          <Spin size="large" style={{ position: 'fixed' }} spinning={isLoading} >
          {
            isCheck
            ? <TableDemo
              data={data}
              isLoading={isLoading}
              total={totalRecord.current}
              page={pagination.page}
              setPagination={setPagination}
            />
            : <DemoCardComponent
              data={data}
              total={totalRecord.current}
              page={pagination.page}
              setPagination={setPagination}
              loadedData={loadedData}
            />
          }
          </Spin>
        </div>
      </div>
    </div>
  )
}