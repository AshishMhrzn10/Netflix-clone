import "./userList.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getUsers, deleteUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function UserList() {
    const { users, dispatch } = useContext(UserContext);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);
    const handleDelete = (id) => {
        deleteUser(id, dispatch);
        window.location.reload();
    };
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.img} alt="" />
                        {params.row.username}
                    </div>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'isAdmin', headerName: 'IsAdmin', width: 200 },
        {
            field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
                return (
                    <>
                        <Link to={{ pathname: "/user/" + params.row._id, singleUser: params.row }}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                );
            }
        },
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(r) => r._id}
            />
        </div>
    );
}
