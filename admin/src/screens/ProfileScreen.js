import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { FiUser, FiMail, FiLock, FiSave, FiInfo } from 'react-icons/fi';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
                setImage(user.image || '');
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, image, password }));
        }
    };

    return (
        <div className="profile-container">
            <h2 className="section-title-v2 mb-4">Edit Profile</h2>
            <Row>
                <Col md={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <h5 className="mb-4 d-flex align-items-center">
                                <FiInfo className="me-2 text-success" /> Personal Information
                            </h5>
                            {message && <Message variant="danger">{message}</Message>}
                            {error && <Message variant="danger">{error}</Message>}
                            {success && <Message variant="success">Profile Updated Successfully</Message>}
                            {loading && <Loader />}
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="name" className="mb-3">
                                            <Form.Label className="fw-500">Full Name</Form.Label>
                                            <div className="input-with-icon">
                                                <FiUser className="input-icon" />
                                                <Form.Control
                                                    type="name"
                                                    placeholder="Enter name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email" className="mb-3">
                                            <Form.Label className="fw-500">Email Address</Form.Label>
                                            <div className="input-with-icon">
                                                <FiMail className="input-icon" />
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="image" className="mb-3">
                                    <Form.Label className="fw-500">Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Choose a profile image for your account.
                                    </Form.Text>
                                </Form.Group>

                                <hr className="my-4" />
                                <h5 className="mb-4 d-flex align-items-center">
                                    <FiLock className="me-2 text-success" /> Change Password
                                </h5>
                                <p className="text-muted small mb-4">Leave both fields blank if you don't want to change your password.</p>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="password" title="password" className="mb-3">
                                            <Form.Label className="fw-500">New Password</Form.Label>
                                            <div className="input-with-icon">
                                                <FiLock className="input-icon" />
                                                <Form.Control
                                                    type="password"
                                                    placeholder="New password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="confirmPassword" title="confirmPassword" className="mb-3">
                                            <Form.Label className="fw-500">Confirm Password</Form.Label>
                                            <div className="input-with-icon">
                                                <FiLock className="input-icon" />
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="mt-4 text-end">
                                    <Button type="submit" variant="primary" className="btn-primary px-5">
                                        <FiSave className="me-2" /> Save Changes
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="border-0 shadow-sm text-center p-4 h-100">
                        <div className="profile-avatar-wrapper mx-auto mb-3">
                            <img
                                src={image || `https://ui-avatars.com/api/?name=${userInfo ? userInfo.name : 'Admin'}&background=0c5b47&color=fff&size=128`}
                                alt="Profile"
                                className="rounded-circle shadow-sm border border-3 border-white"
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                        </div>
                        <h4 className="fw-bold mb-1">{userInfo ? userInfo.name : 'Admin'}</h4>
                        <p className="text-success mb-3 fw-500">Administrator</p>
                        <div className="text-start mt-4 px-2">
                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <span className="text-muted">Account Type</span>
                                <span className="fw-bold">Admin</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Last Activity</span>
                                <span className="fw-bold">Today</span>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <style>{`
                .input-with-icon {
                    position: relative;
                }
                .input-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #8da08e;
                    z-index: 5;
                }
                .input-with-icon .form-control {
                    padding-left: 40px !important;
                }
                .fw-500 {
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default ProfileScreen;
