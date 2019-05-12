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

class NewsFeed extends Component{
    deleteHandler=(id)=>{
        console.log(id);
        let list=this.state.news;
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
        this.setState({news: list});
    }
    state={
        news:[],
        isloading : true
    }

    render(){
       
        return(
            
            <div style={{overflow:''}}>
                {
                    this.state.news.map((value)=>{
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
    componentDidMount=()=>{
       var xhr=new XMLHttpRequest();
       xhr.open('GET','https://cors-anywhere.herokuapp.com/api.currentsapi.services/v1/latest-news');
       xhr.setRequestHeader('Authorization', 'NsusOwUlTxj-ad-59hrqCnRe_hu4ZD42ucYNqFlJ71kNx7Ca' );
       xhr.send();
       xhr.onreadystatechange=()=>{
           if(xhr.status===200 && xhr.readyState===4){
               var res=JSON.parse(xhr.responseText);
               console.log(res.news);
               if(res.news!==null){
                let news1 = this.state.news;  
                news1.splice(0,news1.length);
                for(var i=0;i<res.news.length;i++)
                news1.push(res.news[i]);  
               this.setState({news:news1});
               }
           }
       }
    }
}

export default NewsFeed;