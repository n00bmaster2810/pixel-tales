import {useLocation} from "react-router-dom";

const Album = () => {
    const location = useLocation()
    const posts = location.state?.posts
    console.log("posts: ", posts)
    return <h1>Album</h1>
}

export default Album