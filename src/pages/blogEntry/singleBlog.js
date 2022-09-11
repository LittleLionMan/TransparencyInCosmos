import './singleBlog.css'
import Spinner from "../../components/spinner/spinner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMedium, isLoadingMedium, hasErrorMedium } from "./blogSlice";

export function BlogEntry() {
    const { id } = useParams();
    const medium = useSelector(selectMedium);
    const isLoading = useSelector(isLoadingMedium);
    const hasError = useSelector(hasErrorMedium);
    let post = {}
    const res = medium.items; 
    const posts = res.filter((item) => item.categories.length > 0);
    for (let i in posts) {
        if (id === posts[i].title) {
        post = posts[i];
        }
    }

    if (isLoading) {
        console.log("loading")
        return(
            <div className='center'>
                <Spinner />
            </div>
        )
    }

    if (hasError) {
        console.log("error")
    }
        
    return (
        <div className='center'>
            <h2 className='title'>{post.title}</h2>
            <div className='avatar'>
                <a
                    href={medium.feed.link}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img src={medium.feed.image} alt="profile" width="75" height="75" />
                </a>

                <a
                href={medium.feed.link}
                rel="noopener noreferrer"
                target="_blank"
                >
                    <p>{post.author}</p>
                </a>
                <p>{post.pubDate}</p>
            </div>
  
            <div className="content"  dangerouslySetInnerHTML={{ __html:post.content}}>
            </div>
        </div>
    );
    
}