import { useCallback, useEffect, useRef, useState } from "react";
import { getUserList } from "../../services/user";
import SkeletonComponent from "../core/skeleton";
import TableDemo from "./demo-table";
import DemoCardComponent from "./demo-card";
import { IData, IDocs } from "../../interfaces";
import { Switch } from "antd";
import { useQuery } from "@tanstack/react-query";

export default function DemoComponent({ styles }: { styles: any}) {
  const [loadedData, setLoadedData] = useState<IDocs[] | undefined>([])
  const [isCheck, setIsCheck] = useState(false)
  const [pagination, setPagination] = useState<{page: number, pagesize: number}>({
    page: 1,
    pagesize: 10,
  })
  const totalRecord = useRef(0)
  // const [data, setData] = useState<IData<IDocs>>()
  // const isLoading = useRef(false)

  // const isDifferentData = useCallback((res: IData<IDocs>, compareData: IDocs[]): boolean => {
  //   const isDifferent = res?.docs?.some((item) => {
  //     return compareData?.every((loadedItem) => loadedItem._id !== item._id)
  //   })
  //   return isDifferent
  // }, [])

  // const fetchUserList = useCallback(async () => {
  //   try {
  //     isLoading.current = true
  //     const res = await getUserList(pagination.page, pagination.pagesize)
  //     isLoading.current = false
  //     if (isDifferentData(res, loadedData || [])) {
  //       setLoadedData(
  //         prev => prev ? [...prev, ...res.docs] : res.docs
  //       )
  //       setData(res)
  //     }
  //     if (pagination.page !== res.page) {
  //       setPagination({
  //         page: pagination.page,
  //         pagesize: res.limit,
  //       })
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     isLoading.current = false
  //   }
  // }, [pagination, isDifferentData, loadedData])

  // useEffect(() => {
  //   fetchUserList()
  // }, [pagination.page])

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
      setPagination((prev) => ({
        ...prev,
        page: 1
      }))
    }
  }, [isCheck])

  return (
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
        </div>
      </div>
    </div>
  )
}