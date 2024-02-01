import {
  Grid,
  Box,
  Stack,
  Text,
  useColorMode,
  Divider,
  GridItem,
  Button,
} from "@chakra-ui/react";
import React, { createContext, useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import BoxTarget from "./BoxTarget";
import TableContent from "./TableContent";
import { data, statuses } from "../pages/api/data";

export const CardContext = createContext({
  isDone: (id) => {},
  isInProgress: (id) => {},
  handleEdit: (id) => {},
  handleDelete: (id) => {},
});

const Tasks = () => {
  const { colorMode } = useColorMode();

  const inProgressBG = { light: "teal.300", dark: "teal.700" };
  const doneBG = { light: "blue.300", dark: "blue.700" };
  const tableBG = { light: "blue.100" };

  const [taskList, setTasksList] = useState(data);
  const [doneTask, setDoneTask] = useState([]);

 

  const handleAddTask = () => {
    setDoneTask(() => taskList.filter((task) => task.status === "DONE"));
  };

  const handleEdit = (id, newContent) => {
    setTasksList((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      )
    );
  };

  const handleDelete = (id) => {
    const filteredTasks = taskList.filter((task) => task.id !== id);
    setTasksList(filteredTasks);
    console.log("Deleting task with id:", id);
  };


  const isInProgress = (id) => {
    const draggedTask = taskList.filter((task) => task.id === id)[0];
    draggedTask.status = "InProgress";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);

      return newItems;
    });
  };
  const isDone = (id) => {
    const draggedTask = taskList.find((task) => task.id === id);
    draggedTask.status = "DONE";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);
      return newItems;
    });
  };
return(

  <CardContext.Provider value={{ isDone, isInProgress, handleEdit, handleDelete }}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        marginTop="10"
        w="60vw"
        h="100vh"
        gap={6}
      >
        <Box bg={inProgressBG[colorMode]} rounded="md" w="100%" p={2} boxShadow="md">
          <Stack spacing={1}>
            <Box>
              <Text fontWeight="semibold" fontSize="2xl" textAlign="center">
                In Progress 🔆️
              </Text>
            </Box>
            <Divider />
            {taskList
              .filter((task) => task.status === "InProgress")
              .map(({ icon, title, status, content, id }, idx) => (
                <TaskCard
                  id={id}
                  key={idx}
                  icon={icon}
                  title={title}
                  status={status}
                  content={content}
                />
              ))}
          </Stack>
        </Box>

        <Box bg={doneBG[colorMode]} rounded="md" w="100%" p={2} boxShadow="md">
          <Stack spacing={1}>
            <Box>
              <Text fontWeight="semibold" fontSize="2xl" textAlign="center">
                DONE ✅
              </Text>
              <Divider />
            </Box>
            <BoxTarget>
              {taskList
                .filter((task) => task.status === "DONE")
                .map(({ icon, title, status, content, id }, idx) => (
                  <TaskCard
                    id={id}
                    key={idx}
                    icon={icon}
                    title={title}
                    status={status}
                    content={content}
                  />
                ))}
            </BoxTarget>
          </Stack>
        </Box>

        <Box
          bg={tableBG[colorMode]}
          rounded="md"
          p={4}
          marginTop="10"
          h="40vh"
          gap={10}
          boxShadow="md"
          overflowY="auto"
          gridColumn="span 2"
        >
          <TableContent doneTask={doneTask} />
        </Box>
      </Grid>

      <Box mt={6} ml={4} w="40px">
        <Button mt={4} colorScheme="purple" onClick={handleAddTask}>
          Save DONE Tasks
        </Button>
      </Box>
    </CardContext.Provider>
  );
};

export default Tasks;
