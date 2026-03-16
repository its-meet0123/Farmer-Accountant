import { Button, message } from "antd";
import { PageContainer } from "../../component/PageContainer";
import { useState } from "react";
import { useEffect } from "react";
import { getAllFieldWorkerData } from "../../service/other";

const OtherExpense = () => {
  const { t } = useAuth();
  const [additonalWorker, setAdditonalWorker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState();

  useEffect(() => {
    async function getData() {
      const res = await getAllFieldWorkerData();
      const data = await res.data;
      console.log(data.check);
      message.success(t(data.Code));
    }
    getData();
  }, []);
  return (
    <>
      <PageContainer
        title={"Other Expense"}
        extra={<Button type="primary">Add Expense</Button>}>
        Other expense in farmer life
      </PageContainer>
    </>
  );
};

export default OtherExpense;
