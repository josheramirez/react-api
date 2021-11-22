import { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import { Link } from "react-router-dom";

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [voteSection, setVoteSection] = useState(null);
    
    const {id} = useParams();

    useEffect(()=>{
        //console.log('value id post is',id,voteSection);
        // get post from db
        fetch('http://localhost:3000/posts/'+id,{
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then(response => response.json())
        .then((res)=>{
            console.log('response from rails: get details post');
            // console.log(res);
            setPost(res);
            setVoteSection(res.user_vote);
        })
    },[]);

    const handleVote=(e)=>{
        console.log('vote for', e.target.id);
        //save vote in model vote (Accuracy)
        const vote={'vote':{
                post_id: post.id,
                user_id: post.user.id,
                value: e.target.id,
                kind: 'post_accuracy'
        }}

        fetch('http://localhost:3000/accuracies',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(vote)
        })
        .then(response => response.json())
        .then((res)=>{
            console.log('response rails: save  accuracy');
            console.log(res);
            setPost({...post,user_vote:res.response})
            setVoteSection(res.response);
        })
    }
    const addClaim=(e)=>{
        console.log('adding new claim');
    }
    const handleOpinionChange=()=>{
        console.log('cambio de opinion');
        setVoteSection(null);
    }

    if (post) {
        return(
            <div className="post_details">
                <h2>POST DETAIL</h2>{post.id},{post.user.id},{post.user_vote!=null?"exite":'vacio'}
                <div className="head_post" >
                    <span>{post.user.email}<span> opina sobre:</span></span>
                    
                    <span>{post.target.name}</span>
                </div>
                <div className="post_title">{post.title}</div>
                <div className="post_content">{post.content}</div>

                <div className="accuracy_section">
                    {voteSection==null?
                        <div className="new_vote">
                            <span>crees en esta informacion es verdad?</span>
                            <div className="vote">
                                <div className="answer_yes answer">
                                    <i className="social-icon fa fa-thumbs-up" onClick={handleVote} id="answer_yes"></i>
                                </div>
                                <div className="answer_no answer">
                                    <i className="social-icon fa fa-thumbs-up" onClick={handleVote} id="answer_no" ></i>
                                </div>
                            </div> 
                        </div>
                        :
                        <div className="change_opinion">
                            <div>Actualmente consideras que esta publicacion es <span className={"accuracy_actual_vote"+" "+(post.user_vote.value==="answer_yes"?"vote_positive":"vote_negative")}>{post.user_vote.value==="answer_yes"?"verdadera":"falsa"}</span></div>
                            <div className="change_opinion_btn">Tienes nuevos antecedentes? siempre puedes cambiar tu opion sobre esta noticia <span className="btn_opinion_change" onClick={handleOpinionChange}>AQUI</span></div>
                        </div>
                    }

                </div>
               

                <Link to={{ pathname:"/create", params:{original_post: post} }} className="wrapper_me_too">
                    <div className="me_too">
                        <span>tuviste este mismo problema? agrega tu denuncia</span>
                    </div>
                </Link>
                    
              
                <div className="comments">
                    <div className="total_comments"> 13 comentarios</div>
                    <div className="comment">
                        <div className="original_comment">
                            <div className="user_avatar">
                                <img src={process.env.PUBLIC_URL + '/avatar_female.jpg'} alt="" style={{width:'55px', borderRadius:'50px'}}/>
                            </div>
                            <div className="user_comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.</div>
                        </div>
                        <div className="comment_response">
                            <div className="user_avatar">
                                <img src={process.env.PUBLIC_URL + '/avatar_female.jpg'} alt="" style={{borderRadius:'50px'}}/>
                            </div>
                            <div className="user_comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="chargin">Cargando...</div>
        )
    }
}

export default PostDetails;


// falta mapstatetoprops para sacar el actual usuario y mandar eso por el fetch para crear el voto