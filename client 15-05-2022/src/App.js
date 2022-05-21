import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner, Button } from "react-bootstrap";
import "./App.css";
import { AddForm } from "./components/form/AddForm";
import { BadList } from "./components/task-list/BadList";
import { TaskList } from "./components/task-list/TaskList";
import { Title } from "./components/title/Title";
import { fetchAllTasks, postTask, deleteTasks } from "./helpers/axiosHelper";

const weeklyHrs = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  //   const [badList, setBadList] = useState([]);
  const badList = [];
  const [response, setResponse] = useState({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchAllTasks();
    result?.status === "success" && setTaskList(result.result);
    console.log(result);
  };

  // remove item form the task list
  const removeFromTaskList = async (_id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await deleteTasks(_id);
      setResponse(result);

      result.status === "success" ? fetchData() : setResponse(result);
    }
  };
  // remove item form the bad list
  const removeFromBadList = (i) => {};

  //   const shiftToBadList = (i) => {
  const switchTask = async (obj) => {
    console.log(obj);
  };

  // from bad list to task list
  const shiftToTaskList = (i) => {
    const item = badList[i];
    setTaskList([...taskList, item]);
    removeFromBadList(i);
  };

  const taskListTotalHr = taskList.reduce((acc, item) => acc + item.hr, 0);
  const badListTotalHr = badList.reduce((acc, item) => acc + item.hr, 0);
  const ttlHRs = taskListTotalHr + badListTotalHr;

  const addToTaskList = async (newInfo) => {
    if (ttlHRs + newInfo.hr <= weeklyHrs) {
      // call api to send the data to the server
      setIsLoading(true);

      //first send new data to the server and wait for the response with {status, message}
      const result = await postTask(newInfo);
      setResponse(result);
      setResponse(result);
      setIsLoading(false);

      result?.status === "success" ? fetchData() : setTaskList(result);
    } else {
      alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
    }
  };

  const handleOnSelectItem = (e) => {
    const { value, checked } = e.target;

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };
  console.log(ids);

  return (
    <div className="wrapper">
      <Container>
        {/* title comp */}
        <Title />

        {isLoading && <Spinner animation="border" variant="primary" />}
        {response?.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {/* form comp */}
        <AddForm addToTaskList={addToTaskList} />

        <hr />

        {/* Task list comp */}
        <Row>
          <Col md="6">
            <TaskList
              taskList={taskList}
              removeFromTaskList={removeFromTaskList}
              switchTask={switchTask}
              handleOnSelectItem={handleOnSelectItem}
            />
          </Col>
          <Col md="6">
            <BadList
              badList={badList}
              removeFromBadList={removeFromBadList}
              shiftToTaskList={shiftToTaskList}
              badListTotalHr={badListTotalHr}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {ids.concat.length && (
              <Button onClick={() => removeFromTaskList(ids)} variant="danger">
                {" "}
                "Delete Seleted Tasks"
              </Button>
            )}
          </Col>
        </Row>

        {/* total hours allocation */}

        <Row>
          <Col>
            <h3 className="mt-5">
              The total allocated hours is: {ttlHRs}
              hrs
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
