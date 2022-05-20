import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

export const TaskList = ({ taskList, removeFromTaskList, shiftToBadList }) => {
	return (
		<div>
			<h2 className="text-center">Task list</h2>
			<hr />

			{/* this table is for the task list */}
			<Table striped hover>
				<tbody>
					{taskList.map((item, i) => (
						<tr key={i}>
							<td>
								<Form.Check type="checkbox" />
							</td>
							<td>{item.task}</td>
							<td>{item.hr}hrs</td>
							<td className="text-end">
								<Button variant="danger" onClick={() => removeFromTaskList(i)}>
									<i className="fa-solid fa-trash-can"></i>
								</Button>{" "}
								<Button variant="primary" onClick={() => shiftToBadList(i)}>
									<i className="fa-solid fa-arrow-right-long"></i>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
