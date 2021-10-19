import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";

export default function Watch() {
    return (
        <div className="watch">
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video
                className="video"
                autoPlay
                progress
                controls
                src="https://static.videezy.com/system/resources/previews/000/021/576/original/drone-follows-parachute-boat-4K.mp4"
            />
        </div>
    );
}
