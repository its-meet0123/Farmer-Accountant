import { Button, message, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getAllSeason } from "../../service/season";
import { PageContainer } from "../../component/PageContainer";
import { useAuth } from "../../auth/AuthContext";
import SeasonModal from "../../auth/SeasonModal";

const formattedDate = (date) => {
  const rawDate = date ? new Date(date) : new Date();
  const DateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(rawDate);

  return DateTimeFormat;
};

const Season = () => {
  const { authState, t, season, setSeason } = useAuth();
  const [seasonList, setSeasonList] = useState([]);

  const addSeason = () => {
    setSeason({
      ...season,
      openModal: true,
    });
  };

  const editSeason = () => {};

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllSeason();
        const list = await res.data;
        if (list.status == "success") {
          setSeasonList(list.data);
          message.success("Season list fetched successfully");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [season]);

  const tableData = seasonList.map((item, index) => ({
    ...item,
    serialNo: index + 1,
  }));

  const columns = [
    {
      title: "S.No.",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => {
        const date = formattedDate(startDate);

        return date;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        const date = formattedDate(endDate);

        return date;
      },
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => {
        const today = new Date();
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);

        if (today >= startDate && today <= endDate) {
          return "Active Now";
        } else if (today < startDate) {
          return "Upcoming";
        } else if (today > endDate) {
          return "Expired";
        }
      },
    },
    {
      title: "Action",
      key: "a",
      render: (_, record) => {
        return (
          //   <Space size="middle">

          //     {/* Edit Button */}
          //     <Tooltip title="Edit">
          //       <Button
          //         type="primary"
          //         icon={<EditOutlined />}
          //         onClick={() => addSeason()}
          //       />
          //     </Tooltip>
          //     </Space>
          null
        );
      },
    },
  ];

  return (
    <>
      <PageContainer
        title={"Season List"}
        extra={
          <Button type="primary" onClick={() => addSeason()}>
            Add season
          </Button>
        }>
        <Table dataSource={tableData} columns={columns} rowKey={"_id"} />
      </PageContainer>
      <SeasonModal
        season={season}
        setSeason={setSeason}
        userId={authState.user.userId}
      />
    </>
  );
};

export default Season;
