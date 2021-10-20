import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { donatePublicProject } from '../utils/near-utils';


const ProjectTable = ({ wallet, data }) => {

    const handleDonate = async (name) => {
        const project = {
            "name": name,
            "amount": "20"
        };

        const result = await donatePublicProject(wallet, project);
        const {
            status: { SuccessValue },
        } = result;
        console.log(atob(SuccessValue));
    }

    return (<Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Name</th>
                <th>Donate</th>
            </tr>
        </thead>
        <tbody>
            {data.map((name) =>
                <tr key={name}>
                    <td>{name}</td>
                    <td><Button variant="outline-success" onClick={() => { handleDonate(name) }}>Donate</Button></td>
                </tr>
            )}
        </tbody>
    </Table>);
};

export default ProjectTable;