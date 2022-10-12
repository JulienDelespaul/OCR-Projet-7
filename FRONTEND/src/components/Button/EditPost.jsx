import usePostsRefresh from "../../hooks/usePostsRefresh";
import useAuth from "../../hooks/useAuth";
import "../Button/button.css";

const EditPost = ({ post, setShowModal }) => {
	return (
		<button onClick={setShowModal} className="brutal-btn">
			Modifier le post
		</button>
	);
};

export default EditPost;
