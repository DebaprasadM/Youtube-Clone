import { useParams } from "react-router-dom";
import PlayVideo from "../../components/playVideo/PlayVideo";
import Recommanded from "../../components/recommanded/Recommanded";
import "./Video.css";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommanded categoryId={categoryId}  videoId={videoId}/>
    </div>
  );
};
export default Video;
