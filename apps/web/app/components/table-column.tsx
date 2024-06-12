import { Tag } from 'antd';
import { useMemo } from 'react'

export default function TableColumns() {
  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
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
      },
      {
        title: 'Meeting Days',
        dataIndex: 'meeting_days',
        key: 'meeting_days',
        align: 'center',
        render: (_: any, record: any) => (
          <>
            {record?.meeting_days.map((item: string, index: number) => {
              let color
              switch (index + 1) {
                case 1:
                  color = 'volcano'
                  break;
                case 2:
                  color = 'blue'
                  break;
                case 3:
                  color = 'green'
                  break;
                case 4:
                  color = 'yellow'
                  break;
                case 5:
                  color = 'geekblue'
                  break;
                default:
                  color = 'purple'
                  break;
              }
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
      },
    ],
    []
  )
  return columns
}
