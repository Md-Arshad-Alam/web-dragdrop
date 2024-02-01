// TaskCard.js

import React, { useContext, useState } from "react";
import { useDrag } from "react-dnd";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import itemsTypes from "../utils/itemsTypes";
import { CardContext } from "./Tasks";

const TaskCard = ({ status, title, content, icon, id }) => {
  const { isDone, isInProgress, handleEdit, handleDelete } = useContext(CardContext);

  const [{ isDragging }, drag] = useDrag({
    type: itemsTypes.CARD,
    item: { type: itemsTypes.CARD, ID: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEdit(id, editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    handleDelete(id);
  };

  return (
    <Box
      ref={drag}
      opacity={isDragging ? 0.8 : 1}
      bg="whiteAlpha.800"
      rounded="md"
      textAlign="center"
      p={2}
      mt={2}
      boxShadow="md"
    >
      <Text fontWeight="semibold" fontSize="md">
        {status}
      </Text>
      <Text fontWeight="semibold" fontSize="md">
        {title}
      </Text>

      {isEditing ? (
        <Input
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          size="sm"
          mb={2}
        />
      ) : (
        <Text fontWeight="semibold" fontSize="md">
          {content}
        </Text>
      )}

      <Text fontWeight="semibold" fontSize="md">
        Buy 2L Milk finally is free!!
        <span role="img" aria-label="Emoji">
          {icon}
        </span>
      </Text>

      {isEditing ? (
        <>
          <Button size="sm" colorScheme="green" onClick={handleSaveClick} mr={2}>
            Save
          </Button>
          <Button size="sm" colorScheme="red" onClick={handleCancelClick}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" colorScheme="blue" onClick={handleEditClick} mr={2}>
            Edit
          </Button>
          <Button size="sm" colorScheme="red" onClick={handleDeleteClick}>
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};

export default TaskCard;
