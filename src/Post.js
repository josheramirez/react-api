import { Link } from "react-router-dom";

const Post = (props) => {
    // const {type}=props.location.params
    // return (
    //     <div className="post_detail">
    //         <h2>POST </h2>
    //         {type}
    //     </div>
    // );
    const {post} = props;

    return (
        <div className="post_detail">
            {console.log(post.target.name)}
            <div className="post row" key={post.id}>
                 <div className="span8">
                    {/* header post */}
                   <div className="post_title">
                     <div className="post_title_name">
                        <h4>
                           <strong>
                                <Link to={`/target/${post.target.id}`}>
                                    {post.target.name}
                                </Link>
                               {/* <a href="#">{post.target.name}</a> */}
                           </strong>
                        </h4>
                     </div>
                     <div className="post_title_name">
                        <h4>
                            <strong>
                                <Link to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                            </strong>
                        </h4>
                     </div>
                   </div>
                   <div className="row post_body">
                     <div className="span2 post_img">
                       <a href="#" className="thumbnail">
                         <img src="http://placehold.it/260x180" alt="" />
                       </a>
                     </div>
                     <div className="span6 post_content">      
                       <p className='content_resume' style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display:'-webkit-box',
                            WebkitLineClamp:3,
                            WebkitBoxOrient: 'vertical'}}
                       >
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit quidem quibusdam molestias dolorum doloremque eligendi id nisi odit dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto adipisci temporibus quaerat sequi in ea perspiciatis ut placeat impedit quas eligendi suscipit nisi, hic at doloribus possimus voluptatum optio id.                </p>
                       <div className="read_more_section">
                           <Link to={`/post/${post.id}`}>
                                <p className="btn">Read more</p>
                           </Link>
                            <div className="post_veracity">
                                <span>info validada por el 86% de los usuarios</span>
                            </div>
                       </div>
                     </div>
                   </div>
                   <div className="row post_footer">
                     <div className="span10">
                       <p></p>
                       <p>
                         <i className="icon-user"></i> by <a href="#">John</a> 
                         | <i className="icon-calendar"></i> Sept 16th, 2012
                         | <i className="icon-comment"></i> <a href="#">3 Comments</a>
                         | <i className="icon-share"></i> <a href="#">39 Shares</a>
                         | <i className="icon-tags"></i> Tags : <a href="#"><span className="label label-info">Snipp</span></a> 
                         <a href="#"><span className="label label-info">Bootstrap</span></a> 
                         <a href="#"><span className="label label-info">UI</span></a> 
                         <a href="#"><span className="label label-info">growth</span></a>
                       </p>
                     </div>
                   </div>
                 </div>
             </div>
        </div>
    );
}
export default Post;