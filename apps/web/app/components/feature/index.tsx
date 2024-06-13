import { useEffect, useState } from "react";
import { getUserList } from "../../services/user";
import { useQuery } from "@tanstack/react-query";
import SkeletonComponent from "../core/skeleton";
import TableDemo from "./demo-table";
import DemoCardComponent from "./demo-card";
import { IDocs } from "../../interfaces";
import { Switch } from "antd";

export default function DemoComponent({ styles }: { styles: any}) {
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  const [loadedData, setLoadedData] = useState<IDocs[] | undefined>([])
  const [isCheck, setIsCheck] = useState(false)
  
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
      setLoadedData((prev: any) => [
        ...prev,
        ...data.docs
      ])
    }
  }, [data])

  useEffect(() => {
    if (isCheck) {
      setLoadedData([])
      setPage(1)
    }
  }, [isCheck])

  return (
    <>
      <div className={styles.hero}>
      <Switch
        checkedChildren="Table"
        checked={isCheck}
        onChange={() => setIsCheck(!isCheck)}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}
      />
        <div className={styles.heroContent}>
          <div className={styles.logos}>
            {
              isCheck
              ? <SkeletonComponent
                loading={isLoading}
                // paragraph={{ rows: 10, width: '100%' }}
              >
                <TableDemo
                  data={data}
                  isLoading={isLoading}
                  setPage={setPage}
                  total={total}
                  page={page}
                  setPagesize={setPagesize}
                />
              </SkeletonComponent>
              : <DemoCardComponent
                data={data}
                setPage={setPage}
                total={total}
                page={page}
                loadedData={loadedData}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
}