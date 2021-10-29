import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2E0M2E2ZjcyNzU0YmUyYWI5Y2M1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTUyMjY2NCwiZXhwIjoxNjM1OTU0NjY0fQ.VK_jNiBK-BkwSFrBcTDwke4a7nEN0EvU-kQoJMe5S6Y"
                        }
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);
    return (
        <div className="home">
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List list={list} key={list._id} />
            ))}
        </div>
    );
};

export default Home;

