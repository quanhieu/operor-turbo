import { useVT } from "virtualizedtableforantd4";
import { Dispatch, SetStateAction } from "react";
import TableCustom from "../../core/table";
import TableColumns from './table-column';
import { IData, IDocs } from "../../../interfaces";

export default function TableDemo({
  data, isLoading, setPage, total, page, setPagesize
}: {
  data: IData<IDocs> | undefined;
  isLoading: boolean;
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPagesize: Dispatch<SetStateAction<number>>;
}) {
  const [vt] = useVT(() => ({
    onScroll: async ({ isEnd }) => {
      if (isEnd) {
        if (data?.docs && data?.docs?.length * page < data.totalDocs) {
          setPage((prev) => prev + 1)
        }
      }
    },
    scroll: {
      y: 300,
    },
    debug: false
  }), [data]);

  return (
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
  )
}