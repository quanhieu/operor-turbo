import { Tag } from 'antd';
import { useMemo } from 'react'
import { getRandomColor } from '../../utils';

export default function TableColumns() {
  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        fixed: 'left',
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        width: 130
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        width: 130
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'IP Address',
        dataIndex: 'ip_address',
        key: 'ip_address',
      },
      {
        title: 'Days',
        dataIndex: 'days',
        key: 'days',
        width: 100,
      },
      {
        title: 'Meeting Days',
        dataIndex: 'meeting_days',
        key: 'meeting_days',
        align: 'center',
        width: 200,
        render: (_: any, record: any) => (
          <>
            {record?.meeting_days.map((item: string) => {
              const color = getRandomColor(['volcano', 'blue', 'green', 'yellow', 'geekblue', 'purple'])
              return (
                <Tag color={color} key={item}>
                  {item}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Total Days Without Meeting',
        dataIndex: 'total_days_without_meeting',
        key: 'total_days_without_meeting',
        align: 'center',
        render: (item: number) => item > 0 ? item : 0
      },
    ],
    []
  )
  return columns
}
