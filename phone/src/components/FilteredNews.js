import React,{Component} from 'react';
import '../components/NewsFeed.css';

function ImageCall(props){
    if(props.isPresent.image!=="None")
    {
        return (
            <div className="imgNData">
            <img src={props.isPresent.image} style={{height:'250px', width:'35%',marginTop:'5px'}}></img>
            <span id="dataNRef"style={{width:'60%',wordWrap:'break-word',marginLeft:'5px'}}>    
            <p>{props.isPresent.description}</p>
            <p style={{fontWeight:700,}}>Referrence</p>
            <a href={props.isPresent.url}>{props.isPresent.url}</a>
            </span>
            </div>
        )
    }
    else{
        return(
            <div className="imgNData">
            <span id="dataNRef"style={{width:'100%',wordWrap:'break-word'}}>    
            <p>{props.isPresent.description}</p>
            <p style={{fontWeight:700,}}>Referrence</p>
            <a href={props.isPresent.url}>{props.isPresent.url}</a>
            </span>
            </div>
        )
    }
 }

class FilteredNews extends Component{
    deleteHandler=(id)=>{
        console.log(id);
        let list=this.props.news;
        let index=-1;
        list.forEach(function(subscriber,ind)
        {
            //console.log(ind);
            if(subscriber.id === id)
            {
               
                index=ind;
            }
        },this);
        //console.log(index);
        list.splice(index,1);
        this.props.onclickHandler(list);
    }

    render(){
        return(
            
            <div style={{overflow:''}}>
                {
                    this.props.news.map((value)=>{
                        return(
                            <div className="feedContainer" key={value.id}>
                            <span style={{float:"right"}} onClick={()=>{this.deleteHandler(value.id)}}>&#10006;</span>
                            <h3>{value.title}</h3>
                            <span className="publisher">{value.author}&nbsp;&nbsp;</span>
                            <span className="dated">|&nbsp;&nbsp;{(value.published).slice(0,20)}</span><br/>
                            <ImageCall isPresent={value}/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
   
}

export default FilteredNews;