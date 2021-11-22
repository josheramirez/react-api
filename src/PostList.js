import Post from "./Post";

const PostList = (props) => {
    
    const {posts}=props;
    if(posts){    
      return(
        <div className="post_list">
            <h2>POSTS </h2>
            {posts.map((post)=>(
              <Post post={post} key={post.id}></Post>
            //      <div className="post row" key={post.id}>
            //      <div className="span8">
            //        <div className="post_title">
            //          <div className="post_title_name">
            //            <h4><strong><a href="#">{post.title}</a></strong></h4>
            //          </div>
            //          <div className="post_veracity">
            //            <span>info validada por el 86% de los usuarios</span>
            //          </div>
            //        </div>
            //        <div className="row post_body">
            //          <div className="span2 post_img">
            //            <a href="#" className="thumbnail">
            //              <img src="http://placehold.it/260x180" alt="" />
            //            </a>
            //          </div>
            //          <div className="span6 post_content">      
            //            <p>
            //              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto adipisci temporibus quaerat sequi in ea perspiciatis ut placeat impedit quas eligendi suscipit nisi, hic at doloribus possimus voluptatum optio id.                </p>
            //            <p><a className="btn" href="#">Read more</a></p>
            //          </div>
            //        </div>
            //        <div className="row post_footer">
            //          <div className="span10">
            //            <p></p>
            //            <p>
            //              <i className="icon-user"></i> by <a href="#">John</a> 
            //              | <i className="icon-calendar"></i> Sept 16th, 2012
            //              | <i className="icon-comment"></i> <a href="#">3 Comments</a>
            //              | <i className="icon-share"></i> <a href="#">39 Shares</a>
            //              | <i className="icon-tags"></i> Tags : <a href="#"><span className="label label-info">Snipp</span></a> 
            //              <a href="#"><span className="label label-info">Bootstrap</span></a> 
            //              <a href="#"><span className="label label-info">UI</span></a> 
            //              <a href="#"><span className="label label-info">growth</span></a>
            //            </p>
            //          </div>
            //        </div>
            //      </div>
            //  </div>
            ))}
        </div>
    
    );
            }else{
              return <div className="charging">Cargando..</div>
            }
}

export default PostList;
