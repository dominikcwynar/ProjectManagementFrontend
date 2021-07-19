import React from "react";
import { IssueInfo } from "./IssueInfo";
import {Collaborator, Issue} from "../api/issuesAPI.types";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  issues: Issue[];
  onAssign: (user: Collaborator, issue: Issue) => void;
  assignableUsers: Collaborator[];
}

export const IssuesList: React.FC<Props> = ({ issues, onAssign, assignableUsers }) => {
  const chartData = [];
  
  const todo = issues.filter(x => x.status == 0);
  const doing = issues.filter(x => x.status == 1);
  const done = issues.filter(x => x.status == 2);

  chartData.push({name: "To Do", count: todo.length});
  chartData.push({name: "Doing", count: doing.length});
  chartData.push({name: "Done", count: done.length});
  
  return (
    <>
      <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      <Table colorScheme="primary" size="lg" variant="simple">
        {/* <TableCaption>Issues</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Assignee</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.map(issue => (
            <IssueInfo key={issue.id} issue={issue} onAssign={onAssign} assignableUsers={assignableUsers} />
          ))}
        </Tbody>
    </Table>
    </>
  );
};
