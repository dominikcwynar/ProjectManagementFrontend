import React, { useState } from "react";
import {Collaborator, Issue} from "../api/issuesAPI.types";
import { updateIssue } from "../api/issuesAPI";
import { useParams } from "react-router-dom";
import {
  Tr,
  Td,
  useDisclosure,
  Button,
  Text,
  Select
} from "@chakra-ui/react";
interface Props {
  issue: Issue;
  onAssign: (user: Collaborator, issue: Issue) => void;
  assignableUsers: Collaborator[];
}

export const IssueInfo: React.FC<Props> = props => {
  const { projectId } = useParams();
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newIssue = {...issue, status: parseInt(value)}
    setIssue(newIssue);
    updateIssue(newIssue, projectId);
  }
  const [issue, setIssue] = useState(props.issue);

  const handleReassign = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(value);
    const newIssue = {...issue, assignee: value}
    setIssue(newIssue);
    props.onAssign({username: value}, newIssue);
  }

  return (
    <Tr>
      <Td>
        <Text
        >
          {issue.id}
        </Text>
      </Td>
      <Td>{issue.name}</Td>
      <Td>{issue.description}</Td>
      <Td>
        <Select value={props.issue.assignee ?? ""} onChange={handleReassign}>
          <option value={""}>-</option>
          {props.assignableUsers.map(assignableUser => <option key={assignableUser.username} value={assignableUser.username}>{assignableUser.username}</option>)}
        </Select>
      </Td>
      <Td>
        <Select onChange={handleStatusChange} value={issue.status}>
          <option value={0}>To do</option>
          <option value={1}>Doing</option>
          <option value={2}>Done</option>
        </Select>
      </Td>
    </Tr>
  );
};
