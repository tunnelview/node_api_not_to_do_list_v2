import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

export const BadList = ({
	badList,
	removeFromBadList,
	shiftToTaskList,
	badListTotalHr,
}) => {
	return (
		<div>
			<h2 className="text-center">Bad list</h2>
			<hr />

			{/* this table is for the task list */}
			<Table striped hover>
				<tbody>
					{badList.map((item, i) => (
						<tr key={i}>
							<td>
								<Form.Check type="checkbox" />
							</td>
							<td>{item.task}</td>
							<td>{item.hr}hrs</td>
							<td className="text-end">
								<Button variant="warning" onClick={() => shiftToTaskList(i)}>
									<i className="fa-solid fa-arrow-left-long"></i>
								</Button>{" "}
								<Button variant="danger" onClick={() => removeFromBadList(i)}>
									<i className="fa-solid fa-trash-can"></i>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<h4 className="mt-4 text-danger">
				You could have saved: {badListTotalHr}hrs
			</h4>
		</div>
	);
};
