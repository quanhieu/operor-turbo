import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Card, Col, Row, Tag } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import { IData, IDocs } from "../../../interfaces";
import { getRandomColor } from "../../../utils";
import SkeletonComponent from "../../core/skeleton";

export default function DemoCardComponent(
  { data, setPagination, total, page, loadedData }: {
  data: IData<IDocs> | undefined;
  total: number;
  page: number;
  setPagination: Dispatch<SetStateAction<{
    page: number;
    pagesize: number;
  }>>;
  loadedData: IDocs[] | undefined;
  }
) {
  const isMore = useMemo(() => {
    if (!data || !data?.docs || data?.docs?.length === total) {
      return false
    }
    return data?.docs?.length * page < data.totalDocs
  }, [data, total, page])

  const handlePagination = useCallback((): void => {
    setPagination(prev => ({
      ...prev,
      page: prev.page + 1
    }))
  }, [])
  
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 'calc(100vh - 16vh)',
        overflow: 'auto',
        width: '100%',
      }}
    >
      {/* clientheight + scrollTop === scrollheight */}
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={loadedData?.length || 0}
        next={handlePagination}
        hasMore={isMore}
        loader={
          <SkeletonComponent
            loading={true}
            paragraph={{ rows: 10, width: '100%' }}
          />
        }
        endMessage={
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            {
              data?.docs?.length === total
              && <b>Yay! You have seen it all</b>
            }
          </p>
        }
      >
        <Row
          gutter={[16, 16]}
        >
          {
            loadedData?.map((item) => (
              <Col
                key={item._id}
                span={8}
                xs={24}
                sm={12}
                md={8}
              >
                <Card
                  style={{ width: '100%', marginTop: 16, height: '100%' }}
                  bordered
                  hoverable
                >
                  <p>
                    <b>ID: </b>
                    {item.id}
                  </p>
                  <p>
                    <b>First Name: </b>
                    {item.first_name}
                  </p>
                  <p>
                    <b>Last Name: </b>
                    {item.last_name}
                  </p>
                  <p>
                    <b>Email: </b>
                    {item.email}
                  </p>
                  <p>
                    <b>Gender: </b>
                    {item.gender}
                  </p>
                  <p>
                    <b>IP Address: </b>
                    {item.ip_address}
                  </p>
                  <p>
                    <b>Days: </b>
                    {item.days}
                  </p>
                  <p>
                    <b>Meeting Days: </b>
                    {
                      item.meeting_days.map((item: string) => {
                        const color = getRandomColor(['volcano', 'blue', 'green', 'yellow', 'geekblue', 'purple'])
                        return (
                          <Tag color={color} key={item}>
                            {item}
                          </Tag>
                        )
                      })  
                    }
                  </p>
                  <p>
                    <b>Total Days Without Meeting: </b>
                    {
                      item.total_days_without_meeting > 0
                      ? item.total_days_without_meeting 
                      : 0  
                    }
                  </p>
                </Card>
              </Col>
            ))
          }
        </Row>
      </InfiniteScroll>
    </div>
  )
}

