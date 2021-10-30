import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
    const [newUsers, setNewUsers] = useState([]);
    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("/users?new=true", {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2E0M2E2ZjcyNzU0YmUyYWI5Y2M1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTUyMjY2NCwiZXhwIjoxNjM1OTU0NjY0fQ.VK_jNiBK-BkwSFrBcTDwke4a7nEN0EvU-kQoJMe5S6Y"
                    }
                });
                setNewUsers(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map(user => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={user.profilePic || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
