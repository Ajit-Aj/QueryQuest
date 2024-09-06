// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Container,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   Spinner,
//   Alert,
// } from "reactstrap";
// import axiosInstance from "../Axios/AxiosInstance";
// import Loader from "../../utils/Loader";
// import useFetch from "../Custom Hooks/UseFetch";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const response = await axiosInstance.get("/api/auth/users");
//   //       setUsers(response.data);
//   //     } catch (err) {
//   //       console.error("Error fetching users:", err);
//   //       setError("Failed to load users.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);

//   const { data, loading, error } = useFetch("/api/auth/users");
//   setUsers(data);

//   const toggleActiveStatus = async (userId, currentStatus) => {
//     try {
//       await axiosInstance.patch(`/api/admin/status/${userId}`, {
//         isActive: !currentStatus,
//       });
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId ? { ...user, isActive: !currentStatus } : user
//         )
//       );
//     } catch (err) {
//       console.error("Error updating user status:", err);
//       setError("Failed to update user status.");
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="mt-4 text-center">
//         <Loader />
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-4 text-center">User Management</h2>
//       {error && <Alert color="danger">{error}</Alert>}
//       <div className="table-responsive d-none d-md-block user-table">
//         <Table bordered hover className="table-sm">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.isActive ? "Active" : "Inactive"}</td>
//                 <td>
//                   <Button
//                     color={user.isActive ? "success" : "danger"}
//                     onClick={() => toggleActiveStatus(user._id, user.isActive)}
//                     size="sm"
//                   >
//                     {user.isActive ? "Deactivate" : "Activate"}
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Card layout for mobile devices */}
//       <div className="d-block d-md-none">
//         {users.map((user, index) => (
//           <Card key={user._id} className="mb-3">
//             <CardBody>
//               <CardTitle tag="h5">User {index + 1}</CardTitle>
//               <CardText>
//                 <strong>Username:</strong> {user.name}
//               </CardText>
//               <CardText>
//                 <strong>Email:</strong> {user.email}
//               </CardText>
//               <CardText>
//                 <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
//               </CardText>
//               <Button
//                 color={user.isActive ? "success" : "danger"}
//                 onClick={() => toggleActiveStatus(user._id, user.isActive)}
//                 size="sm"
//               >
//                 {user.isActive ? "Deactivate" : "Activate"}
//               </Button>
//             </CardBody>
//           </Card>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Users;











import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Alert,
} from "reactstrap";
import axiosInstance from "../Axios/AxiosInstance";
import Loader from "../../utils/Loader";
import useFetch from "../Custom Hooks/UseFetch";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useFetch("/api/auth/users");

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const toggleActiveStatus = async (userId, currentStatus) => {
    try {
      await axiosInstance.patch(`/api/admin/status/${userId}`, {
        isActive: !currentStatus,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Loader />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">User Management</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <div className="table-responsive d-none d-md-block user-table">
        <Table bordered hover className="table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <Button
                    color={user.isActive ? "success" : "danger"}
                    onClick={() => toggleActiveStatus(user._id, user.isActive)}
                    size="sm"
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Card layout for mobile devices */}
      <div className="d-block d-md-none">
        {users.map((user, index) => (
          <Card key={user._id} className="mb-3">
            <CardBody>
              <CardTitle tag="h5">User {index + 1}</CardTitle>
              <CardText>
                <strong>Username:</strong> {user.name}
              </CardText>
              <CardText>
                <strong>Email:</strong> {user.email}
              </CardText>
              <CardText>
                <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
              </CardText>
              <Button
                color={user.isActive ? "success" : "danger"}
                onClick={() => toggleActiveStatus(user._id, user.isActive)}
                size="sm"
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Users;

