import "./newUser.css";
import { useContext, useState } from "react";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import storage from "../../firebase";
import { useHistory } from "react-router-dom";

export default function NewUser() {
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const history = useHistory();

    const { dispatch } = useContext(UserContext);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(user, dispatch);
        history.push("/users");
    };
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="John" name="username" onChange={handleChange} />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="john@gmail.com" name="email" onChange={handleChange} />
                </div>

                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="password" name="password" onChange={handleChange} />
                </div>

                <div className="newUserItem">
                    <label>Image</label>
                    <input type="file" id="img" name="img" onChange={e => setImg(e.target.files[0])} />
                </div>

                {uploaded === 1 ? (
                    <button className="newUserButton" onClick={handleSubmit}>Create</button>
                ) :
                    (
                        <button className="newUserButton" onClick={handleUpload}>Upload</button>
                    )}
            </form>
        </div>
    );
}
