import { useEffect } from "react";
import { PageContainer } from "../../component/PageContainer";
import { getDashbordData } from "../../service/dashbord";
import { message } from "antd";

const DashBord = () => {
  useEffect(() => {
    async function getData() {
      try {
        const res = await getDashbordData();
        const data = await res.data;
        console.log(data);
        message.success(data.Code);
      } catch (err) {
        console.log(err.message);
        message.error("Dashbord data not fetched");
      }
    }
    getData();
  }, []);
  return (
    <>
      <PageContainer title="Dashbord"></PageContainer>
    </>
  );
};

export default DashBord;
