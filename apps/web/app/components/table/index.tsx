import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface ITableCustom<T> {
  columns: TableProps<T>['columns'];
  dataSource: T[];
  loading?: boolean;
  pagination?: any;
  className?: string;
  scroll?: Record<string, number | boolean>;
  bordered?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  virtual?: boolean;
  components?: TableProps<T>['components'];
  scrollToFirstRowOnChange?: boolean;
}
export default function TableCustom({ columns, dataSource, pagination, loading, ...props }: ITableCustom<any>) {
  return <Table 
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
    loading={loading}
    {...props}
  />;
}