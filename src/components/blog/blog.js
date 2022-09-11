import ShowBlog from "./showBlog";
import Spinner from "../spinner/spinner";
import { useSelector } from "react-redux";
import { selectMedium, isLoadingMedium, hasErrorMedium } from "../../pages/blogEntry/blogSlice";

export function Blog() {
    const medium = useSelector(selectMedium);
    const isLoading = useSelector(isLoadingMedium);
    const hasError = useSelector(hasErrorMedium);
    
    const profile = {
        profileUrl: medium.feed.link,
        avatar: medium.feed.image
    }
    const res = medium.items; //This is an array with the content. No feed, no info about author etc..
    const posts = res.filter(item => item.categories.length > 0);
    
    if (isLoading) {
        return (
        <Spinner />
        )
    }

    if (hasError) {
        return (
            <h1>Error!</h1>
        )
    }

    return (
        
        <div className="container">
            <div className="row">
                {
                    posts.map((post, index) => (
                        <ShowBlog key={index} {...post} {...profile} {...index} />
                      ))
                }
            </div>
        </div>
        
    )
}