import "./user.css";
import { Link } from "react-router-dom";
import storage from "../../firebase";
import { MailOutline, Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { getUser, updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import { useParams } from "react-router-dom";

export default function User() {
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const { users, dispatch } = useContext(UserContext);
    let id = useParams();
    useEffect(() => {
        getUser(id.userId, dispatch);
    }, [id.userId, dispatch]);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    };

    const upload = (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
            uploadTask.on("state_changed", snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is" + progress + "% done.");
            },
                err => console.log(err),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        setUser((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded(prev => prev + 1);
                    });

                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: "img" },
        ]);
    };
    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(id.userId, user, dispatch);
        window.location.reload();
    };
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={users.img}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{users.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">

                        <span className="userShowTitle">Contact Details</span>

                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{users.email}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" name="username" placeholder={users.username} className="userUpdateInput" onChange={handleChange} />
                            </div>

                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" name="email" placeholder={users.email} className="userUpdateInput" onChange={handleChange} />
                            </div>

                            <div className="userUpdateItem">
                                <label>Password</label>
                                <input type="password" name="password" className="userUpdateInput" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    src={users.img}
                                    alt=""
                                    className="userUpdateImg"
                                    name="img"
                                />
                                <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e => setImg(e.target.files[0])} />
                            </div>
                            {uploaded === 1 ? (
                                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                            ) :
                                (
                                    <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
