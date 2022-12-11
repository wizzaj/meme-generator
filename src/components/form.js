import React from "react"

export default function Form()
{   
    const [meme,setMeme]= React.useState({
        topText:"",
        bottomText:"",
        img:"http://i.imgflip.com/1bij.jpg"
    })
    const [img,setImg]=React.useState([]);
    function getNewImg()
    {
       const item = img
       const randomNum = Math.floor(Math.random() * item.length)
       setMeme(previous=>{
        return ({
            ...previous,
            img:item[randomNum].url
        })
       })
    }
    function handleChange(event)
    {
        const{name,value}=event.target
        setMeme(previous=>{
            return({
                ...previous,
                [name] : value
            })
        })
    }
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setImg(data.data.memes))
    },[])
    return(
        <main className="container">
        <div className = "form" >
            <div className="inputs">
            <input 
            className = "first-textplace"
            name="topText"
            placeholder="First Text"
            type="text" 
            autoComplete="off"
            value={meme.topText}
            onChange={handleChange} 
            />
            <input  
            className = "second-textplace"
            name="bottomText"
            placeholder= "Second Text"
            type="text" 
            autoComplete="off"
            value = {meme.bottomText} 
            onChange={handleChange}
            />
            </div>
            <button className= "img-button" onClick={getNewImg}> Get a new images </button>
        </div>
        <div className="meme-area">
        <img src={meme.img} alt="meme" className="meme-img" />
        <h2 className="topText">{meme.topText}</h2>
        <h2 className="bottomText">{meme.bottomText}</h2>
        </div>
        </main>
    )
}