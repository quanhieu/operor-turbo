import { useVT } from "virtualizedtableforantd4";
import { useEffect, useState } from "react";
import SkeletonComponent from "../skeleton"
import { useQuery } from "@tanstack/react-query";
import TableCustom from '../table';
import TableColumns from './table-column';
import { getUserList } from "../../services/user";

export default function TableDemo({ styles }: { styles: any }) {
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

  const [vt] = useVT(() => ({
    onScroll: async ({ isEnd }) => {
      if (isEnd) {
        if (data?.docs && data?.docs?.length * page < data.totalDocs) {
          setPage(prev => prev + 1)
        }
      }
    },
    scroll: {
      y: 300,
    },
    debug: false
  }), [data]
  );

  return (
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
        </div>
      </div>
    </SkeletonComponent>
  )
}