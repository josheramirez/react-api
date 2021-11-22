import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from "react-redux";

const Home = (props) => {
    const [name, setName] = useState('initial value');
    
    const { currentUserRedux } = props;
    const [isPending, setIsPending] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [targetAvatar, setTargetAvatar] = useState(null);
    const [targetAvatarPreview, setTargetAvatarPreview] = useState(null);

    // post values
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    // search targets
    const [foundTargets, setFoundTargets] = useState(null);
    const [targetProfile, setTargetProfile] = useState(null);



    const [selectFormValue, setSelectFormValue] = useState("");
    const [selectFormView, setSelectFormView] = useState(false);
    const [targetNameView, setTargetNameView] = useState(false);


    // comes from other component
    const [postTypeTarget, setPostTypeTarget] = useState('');

    const [postTargetName, setPostTargetName] = useState('');
    
    const [currentUserId, setCurrentUserId] = useState('');

    const [preFillPost, setPreFillPost]=useState(null);

    // get currentUser
    useEffect(() => {
        console.log("props:");
        console.log(props);
        if(typeof props.location.params !== 'undefined'){
            
            console.log(props.location.params);

            // if is a rePost
            if(typeof props.location.params.original_post !== 'undefined'){
                console.log("este es un rePost desde: ");
                setPreFillPost(props.location.params.original_post);
                setIsReadOnly(true);
                setPostTitle(props.location.params.original_post.title);
                setPostTargetName(props.location.params.original_post.target.name);
            }
          
        }else{
            console.log("no hay paramettros");
        }
    }, [])

    const handleClick = (value,e) => {
        console.log('press button', e.target);
        setName(value);
    }

    const handleClick1 = (e) => {
        console.log('press button 1',e.target);
    }
    const handleSubmitPost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (targetProfile) {
            
            formData.append('post[userId]', currentUserRedux.id);
            formData.append('post[title]', postTitle);
            formData.append('post[content]', postContent);
            formData.append('post[targetId]', targetProfile.id);
        }else{
            // const post = {'post':{
            //     userId:currentUserRedux.id,
            //     title: postTitle,
            //     content: postContent,
            //     targetType: postTypeTarget,
            //     targetName: postTargetName
            // }};
            formData.append('post[userId]', currentUserRedux.id);
            formData.append('post[title]', postTitle);
            formData.append('post[content]', postContent);
            formData.append('post[type]', postTypeTarget);
            formData.append('post[name]', postTargetName);
            formData.append('post[avatar]', targetAvatar);
        }

       

        // console.log(post)


        setIsPending(true);
        
        fetch('http://localhost:3000/posts',{
            method:'POST',
            // headers:{'Content-Type':'application/json'},
            // body: JSON.stringify(post)
            body: formData
        })
        .then(response => response.json())
        .then((res)=>{
            console.log('response from rails');
            setIsPending(false);
            console.log(res.status);
        })
    }

    const uploadImage = (file) => {
        console.log(file);
        setTargetAvatar(file);
        setTargetAvatarPreview(URL.createObjectURL(file));
    }

    const handleTargetName = (targetName) => {
        setPostTargetName(targetName)
        console.log(targetName.length > 4)
        if(targetName.length > 4){
            setIsPending(true);
            // search in db
            fetch('http://localhost:3000/targets/'+targetName,{
                method:'GET'
            })
            .then(response => response.json())
            .then((res)=>{
                console.log('Targets from rails');
                setIsPending(false);
                console.log(res, res.length);
                setFoundTargets(res);
                // if(res.length){
                //     setFoundTargets(res);
                // }
            })
        }
    }
    const handleSelectFoundTarget = (id) => {
        console.log(id)
        let target = foundTargets.filter(target=>target.id === id);
        console.log(target[0]);

        // fill inputs whith foundTarget
        // setPostTargetName(target[0].name);
        // setTargetNameView(true);

        // if(target[0].type==""){
        //     setSelectFormValue("product");
        //     setSelectFormView(true)
        // }

        setTargetProfile(target[0]);
    }
    const handleSelectForm = (e) => {
        console.log("seleccione", e.target.value);
        setSelectFormValue(e.target.value);
    }

    const handleTargetConecction = (e) => {
        e.preventDefault();
    }
    
    const handleCloseProfile = (e) => {
        setTargetProfile(null);
        setFoundTargets(null);
        setPostTargetName('');
    }
    return (
        <div className="home">
            {/* <h2>HomePage</h2>
            <p>{name}</p>
            <button onClick={handleClick1}>Click Me</button>
            <button onClick={(e)=> handleClick('data',e)}>Click Me</button> */}
            
            <h2 style={{marginBottom:'50px'}}>Publish New Post</h2>
            {preFillPost?
                <div className="respost_info">
                    <div className="repost_warning">Estas haciendo un rePost de: </div>
                    <div className="title_original">{preFillPost.title}</div>
                </div>
                :
                ""
            }

           
            <form onSubmit={handleSubmitPost}>
                        <div className="loginbox-textbox" >
                            <input 
                                type="hidden"
                                value={currentUserId}
                            />
                            {/* title */}
                            <div>
                                <label htmlFor="" >Asigna un titulo a tu publicacion</label>
                                <input
                                    id="title_input"
                                    style={{textAlign: 'left'}}
                                    type="text" 
                                    className={"form-control"+preFillPost?"prefill_input":""}
                                    value={postTitle}
                                    placeholder="Title"
                                    onChange={(e)=> setPostTitle(e.target.value)}
                                    readOnly={isReadOnly}
                                />
                            </div>
                            {/* content */}
                            <div>
                                <label htmlFor="" >Relata lo ocurrido</label>
                                <input 
                                    style={{textAlign: 'left'}}
                                    type="text" 
                                    className="form-control" 
                                    value={postContent}
                                    placeholder="Content"
                                    onChange={(e)=> setPostContent(e.target.value)}
                                />
                            </div>
                            {/* target */}
                            <div>
                                {/* target name */}
                                <div className="target_name">
                                    <label htmlFor="">Nombre de quien denuncias</label>
                                    <input 
                                        style={{textAlign: 'left'}}
                                        type="text" 
                                        className={"form-control"+preFillPost?"prefill_input":""}
                                        value={postTargetName}
                                        placeholder="Target Name"
                                        onChange={(e)=> handleTargetName(e.target.value)}
                                        readOnly={isReadOnly}
                                        disabled={targetNameView}
                                    />
                                </div>
                                {/* search target */}
                                <div className="found_targets_container">
                                    {foundTargets?
                                        foundTargets.map((target)=>{
                                            return (
                                                <div className="target_item" onClick={()=>handleSelectFoundTarget(target.id)} key={target.id} id={target.id}>
                                                    <div className="inner_img">
                                                        <img src={process.env.PUBLIC_URL + '/avatar_female.jpg'} alt="" /> 
                                                    </div>
                                                    {target.name+" "+target.id}
                                                </div>
                                            );
                                        })
                                        :""
                                    }
                                </div>
                                {targetProfile?
                                    <div className="target_profile" style={{display:'flex', flexDirection:'row', position:'relative'}}>
                                        <div className="left_side">
                                            <div className="target_profile_img" style={{borderRadius:'200px', border:'2px solid #028f1e'}}>
                                                <img src={process.env.PUBLIC_URL+'/avatar_female.jpg'} alt="" width="200px" style={{borderRadius:'100px', border:'2px solid white'}} />
                                            </div>
                                            <div className="">
                                                <span>Tipo:</span>
                                                {targetProfile.type}
                                            </div>
                                        </div>
                                        <div className="right_side" style={{paddingLeft:'30px',paddingTop:'20px', display:'flex', flexDirection:'column'}}>
                                            
                                            <div className="" >
                                                <span>Nombre: </span>
                                                {targetProfile.name}
                                            </div>
                                            <div className="">
                                                <span>Profesion: </span>
                                                {targetProfile.profession}
                                            </div>
                                            <div className="">
                                                <span>Cargo:</span>
                                                {targetProfile.current_job}
                                            </div>
                                            {/* <div className="">
                                                <span>Ciudad Origen:</span>
                                                {targetProfile.city_origin}
                                            </div>
                                            <div className="">
                                                <span>Ciudad Actual:</span>
                                                {targetProfile.city_current}
                                            </div> */}
                                            <div className="statistics">
                                                <div className="">
                                                    <span>Cantidad de denuncias:</span>
                                                    {targetProfile.complains}
                                                </div>
                                            </div>
                                            <div className="conections" style={{marginTop:'auto', marginBottom:'10px'}}>
                                                <button style={{padding:'5px 100px', textTransform:'uppercase'}}  onClick={handleTargetConecction}>Ver conexiones</button>
                                            </div>
                                        </div>
                                        <div className="close_button" style={{position:'absolute',right:'0px', fontSize:'20px'}} onClick={handleCloseProfile}>
                                            x
                                        </div>
                                    </div>
                                    :""
                                }
                                {!targetProfile?
                                    <div className="terget_photo">
                                        <label htmlFor="">Agrega una foto del acusado</label>
                                        <input 
                                        className="target_photo_input"
                                            type="file" 
                                            name="files"
                                            multiple
                                            onChange={(e)=>uploadImage(e.target.files[0])}
                                        />
                                        {/* {console.log(URL.createObjectURL(targetAvatar))} */}
                                        <img src={targetAvatarPreview} style={{width:'100px'}}/>
                                    </div>
                                :
                                ''
                                }
                            </div>

                            {/* post kind */}
                            {!targetProfile?
                                <div className="target_kind">
                                    <label htmlFor="" >A que categoria pertenece la denuncia?</label>
                                    <select name="" id="" value={selectFormValue} onChange={handleSelectForm} disabled={selectFormView}>
                                        <option value="" disabled hidden>Selecciona categoria</option>
                                        <option value="person">Persona</option>
                                        <option value="service">Servicio</option>
                                        <option value="product">Producto</option>
                                        <option value="transit">Infraccion de Transito</option>
                                        <option value="price">Usura / Funa el precio</option>
                                    </select>
                                </div>
                            :
                            ''
                            }

                            <div className="loginbox-submit" style={{width:'100%', marginTop:'30px'}}>
                                <input type="submit" className="btn btn-primary btn-block" value="Publicar"/>
                            </div>
                        </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) =>{
    return {
        currentUserRedux: state.currentUser
    }
}

export default connect(mapStateToProps)(Home);