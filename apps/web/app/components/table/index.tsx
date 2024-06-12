import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface ITableCustom<T> {
  columns: TableProps<T>['columns'];
  dataSource: T[];
  loading?: boolean;
  pagination?: any
}
export default function TableCustom({ columns, dataSource, pagination, loading }: ITableCustom<any>) {
  return <Table 
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
    loading={loading}
  />;
}