import React from 'react';
import Table from 'react-bootstrap/Table';
import { getFriendProjects } from '../utils/near-utils';

const FriendsTable = ({ wallet, data, updateTable }) => {

    const update = async (name) => {

        const data = {
            "friendId": name
        };

        const result = await getFriendProjects(wallet, data);
        const {
            status: { SuccessValue },
        } = result;
        updateTable(atob(SuccessValue).replace(/"/g, '').split(','));
    }

    return (<Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {data.map((name) =>
                <tr key={name} onClick={() => { update(name) }}>
                    <td>{name}</td>
                </tr>
            )}
        </tbody>
    </Table>);
};

export default FriendsTable;