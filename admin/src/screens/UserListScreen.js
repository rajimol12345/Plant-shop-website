import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser } from '../actions/userActions';
import { FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="section-title-v2 mb-0" style={{ fontSize: '1.75rem' }}>User Management</h2>
          <p className="text-muted small">View and manage system users and their roles</p>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="custom-table-container">
          <Table responsive className="custom-table border-0 shadow-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {(users || []).map((user) => (
                <tr key={user._id}>
                  <td className="text-muted small">#{user._id.slice(-6).toUpperCase()}</td>
                  <td>
                    <div className="avatar-circle shadow-sm" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {user.image ? (
                        <img
                          src={`http://localhost:5000${user.image}`}
                          alt={user.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                      ) : (
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0c5b47' }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </span>
                      )}
                      {/* Fallback for broken image linkage if needed via CSS or logic, but standard onError is simpler */}
                      {user.image && <span style={{ display: 'none', fontSize: '1rem', fontWeight: 'bold', color: '#0c5b47' }}>{user.name ? user.name.charAt(0).toUpperCase() : '?'}</span>}
                    </div>
                  </td>
                  <td>
                    <span className="fw-bold text-dark">{user.name}</span>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-decoration-none text-primary-green">{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <span className="status-badge status-paid"><FiCheck className="me-1" /> ADMINISTRATOR</span>
                    ) : (
                      <span className="status-badge bg-light text-muted">CUSTOMER</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn-icon-v2" title="Edit User">
                          <FiEdit size={14} />
                        </button>
                      </Link>
                      <button
                        className="btn-icon-v2 btn-delete"
                        title="Delete User"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;
