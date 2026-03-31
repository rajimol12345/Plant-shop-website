import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { listNewsletterSubscribers, deleteNewsletterSubscriber } from '../actions/newsletterActions';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

const NewsletterListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newsletterList = useSelector((state) => state.newsletterList);
    const { loading, error, subscribers } = newsletterList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const newsletterDelete = useSelector((state) => state.newsletterDelete);
    const { success: successDelete } = newsletterDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listNewsletterSubscribers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this subscriber?')) {
            dispatch(deleteNewsletterSubscriber(id));
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Newsletter Subscribers</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead style={{ backgroundColor: '#0c5b47', color: 'white' }}>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>JOINED AT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers && subscribers.map((subscriber) => (
                            <tr key={subscriber._id}>
                                <td>{subscriber._id}</td>
                                <td><a href={`mailto:${subscriber.email}`}>{subscriber.email}</a></td>
                                <td>{subscriber.createdAt ? subscriber.createdAt.substring(0, 10) : ''}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(subscriber._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default NewsletterListScreen;
