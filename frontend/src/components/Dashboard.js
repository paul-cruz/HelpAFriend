import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FriendsTable from "./FriendsTable";
import ProjectTable from "./ProjectTable";
import { getFriends, getPublicProjects, registerUser } from "../utils/near-utils";


const Dashboard = ({ wallet, account }) => {
    const [publicProjects, setPublicProjects] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendProjects, setfriendProjects] = useState([]);



    useEffect(() => {
        (async () => {
            try {
                const rsp = await registerUser(wallet);
                console.log(rsp);
                var result = await getPublicProjects(wallet);
                var {
                    status: { SuccessValue },
                } = result;
                setPublicProjects(atob(SuccessValue).replace(/"/g, '').split(','));
                result = await getFriends(wallet);
                var {
                    status: { SuccessValue },
                } = result;
                setFriends(atob(SuccessValue).replace(/"/g, '').split(','));
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <h1>Hi: {account.accountId}, Help A Friend!</h1>
                    <Button variant="outline-danger" onClick={() => wallet.signOut()}>Sign Out</Button>
                </Col>
            </Row>
            <Row>
                <Col md="4">
                    <h2>Friends</h2>
                    <FriendsTable data={friends} updateTable={setfriendProjects} wallet={wallet} />
                </Col>
                <Col md="4">
                    <h2>Friend project</h2>
                    <ProjectTable data={friendProjects} wallet={wallet} />
                </Col>
                <Col md="4">
                    <h2>Public Projects</h2>
                    <ProjectTable data={publicProjects} wallet={wallet} />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;