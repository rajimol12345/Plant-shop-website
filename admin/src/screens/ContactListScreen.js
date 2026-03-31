import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';
import { listContacts, deleteContact, updateContactStatus } from '../actions/contactActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CONTACT_UPDATE_STATUS_RESET } from '../constants/contactConstants';

const ContactListScreen = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const contactList = useSelector((state) => state.contactList);
    const { loading, error, contacts } = contactList;

    const contactDelete = useSelector((state) => state.contactDelete);
    const { success: successDelete } = contactDelete;

    const contactUpdateStatus = useSelector((state) => state.contactUpdateStatus);
    const { success: successUpdate } = contactUpdateStatus;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listContacts());
        }
        if (successUpdate) {
            dispatch({ type: CONTACT_UPDATE_STATUS_RESET });
            if (selectedContact) {
                // Update the modal data if open
                setSelectedContact(prev => ({ ...prev, status: 'Read' }));
            }
        }
    }, [dispatch, userInfo, successDelete, successUpdate]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            dispatch(deleteContact(id));
            if (selectedContact && selectedContact._id === id) {
                setShowModal(false);
            }
        }
    };

    const handleShowDetails = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
        if (contact.status === 'Unread') {
            dispatch(updateContactStatus(contact._id, 'Read'));
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    const filteredContacts = contacts ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="contact-list-screen">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 fw-bold" style={{ color: '#003d29' }}>Contact Enquiries</h2>
                <Form.Control
                    type="text"
                    placeholder="Search enquiries..."
                    className="w-auto border-0 shadow-sm"
                    style={{ borderRadius: '20px', padding: '10px 20px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <div className="table-responsive shadow-sm rounded-3 bg-white">
                        <Table hover className="align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 ps-4 border-0">NAME</th>
                                    <th className="py-3 border-0">SUBJECT</th>
                                    <th className="py-3 border-0">DATE</th>
                                    <th className="py-3 border-0">STATUS</th>
                                    <th className="py-3 pe-4 text-end border-0">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">No enquiries found</td>
                                    </tr>
                                ) : (
                                    filteredContacts.map((contact) => (
                                        <tr key={contact._id} className={contact.status === 'Unread' ? 'fw-bold' : ''} style={{ backgroundColor: contact.status === 'Unread' ? '#f8fffa' : 'transparent' }}>
                                            <td className="ps-4 py-3">
                                                <div className="d-flex flex-column">
                                                    <span style={{ color: '#003d29' }}>{contact.name}</span>
                                                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>{contact.email}</small>
                                                </div>
                                            </td>
                                            <td className="py-3">{contact.subject}</td>
                                            <td className="py-3">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                                <small className="d-block text-muted">{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                                            </td>
                                            <td className="py-3">
                                                {contact.status === 'Unread' ? (
                                                    <span className="badge bg-danger rounded-pill px-3">Unread</span>
                                                ) : (
                                                    <span className="badge bg-success rounded-pill px-3">Read</span>
                                                )}
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <Button
                                                    variant="light"
                                                    className="btn-sm rounded-circle shadow-sm me-2 text-primary"
                                                    onClick={() => handleShowDetails(contact)}
                                                >
                                                    <FiEye size={16} />
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    className="btn-sm rounded-circle shadow-sm text-danger"
                                                    onClick={() => deleteHandler(contact._id)}
                                                >
                                                    <FiTrash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Contact Details Modal */}
                    <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                        <Modal.Header closeButton className="border-0">
                            <Modal.Title className="fw-bold" style={{ color: '#003d29' }}>Message Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="px-4 pb-4">
                            {selectedContact && (
                                <div>
                                    <div className="d-flex justify-content-between align-items-start mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div>
                                            <h5 className="mb-1 fw-bold">{selectedContact.name}</h5>
                                            <a href={`mailto:${selectedContact.email}`} className="text-decoration-none text-success">{selectedContact.email}</a>
                                        </div>
                                        <div className="text-end">
                                            <p className="mb-1 text-muted small">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                                            {selectedContact.status === 'Read' && <span className="badge bg-success"><FiCheckCircle className="me-1" /> Read</span>}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small fw-bold text-uppercase mb-1">Subject</label>
                                        <p className="fs-5 fw-bold mb-0">{selectedContact.subject}</p>
                                    </div>

                                    <div>
                                        <label className="text-muted small fw-bold text-uppercase mb-2">Message</label>
                                        <div className="p-3 border rounded bg-white" style={{ minHeight: '150px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                            {selectedContact.message}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer className="border-0 px-4 pb-4">
                            <Button variant="outline-secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={() => selectedContact && deleteHandler(selectedContact._id)}>
                                Delete Enquiry
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ContactListScreen;
