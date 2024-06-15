import { useVT } from "virtualizedtableforantd4";
import { Dispatch, SetStateAction, useCallback } from "react";
import TableCustom from "../../core/table";
import TableColumns from './table-column';
import { IData, IDocs } from "../../../interfaces";

export default function TableDemo({
  data, isLoading, total, page, setPagination
}: {
  isLoading: boolean;
  data: IData<IDocs> | undefined;
  total: number;
  page: number;
  setPagination: Dispatch<SetStateAction<{
    page: number;
    pagesize: number;
  }>>;
}) {
  const [vt] = useVT(() => ({
    onScroll: async ({ isEnd }) => {
      if (isEnd) {
        if (data?.docs && data?.docs?.length * page < data.totalDocs) {
          setPagination((prev) => ({
            ...prev,
            page: prev.page + 1
          }))
        }
      }
    },
    scroll: {
      y: 300,
    },
    debug: false
  }), [data]);

  const onChangePagination = useCallback((newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage
    }))
  }, [])

  return (
    <TableCustom
      bordered
      loading={isLoading}
      dataSource={data?.docs || []}
      columns={TableColumns() as any}
      pagination={{
        onChange: onChangePagination,
        total,
        current: page,
        onShowSizeChange: (current: number, pageSize: number) => {
          setPagination({
            page: current,
            pagesize: pageSize
          })
        },
        showTotal: (total: number, range: any) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ y: 400, scrollToFirstRowOnChange: false }}
      components={vt}
      scrollToFirstRowOnChange={true}
    />
  )
}