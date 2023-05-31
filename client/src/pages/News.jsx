import React from 'react'
import axios from 'axios'
import Tags from '../components/Tags'
import { useState,useEffect } from 'react'
import"./newscss.css"

const News = () => {
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [getTags, setTags] = useState([]);
  const [TagAPIData,setTagAPIData] = useState([])

const Button = ({ buttonText, handleTagClick }) => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(prevState => !prevState); // Update the state directly
    console.log("setison",isOn)
    handleTagClick(buttonText);
  };

  const buttonStyle = {
    backgroundColor:   searchTags.includes(buttonText) ? '#212529':'#364F6B' ,
    color:  searchTags.includes(buttonText) ? 'white':"black",
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid black',
    cursor: 'pointer',
    marginLeft: '5px',
  };

  return (
    <button style={buttonStyle} 
    onClick={handleClick}
 
    >
      {buttonText}
    </button>
  );
};

useEffect(()=>{
  try {
    axios.get(`http://localhost:4000/api`)
    .then((res)=>{
 setTagAPIData(res.data)
 console.log("TagAPIDATA ",TagAPIData.map((x)=>x.source))
    })
  } catch (error) {
    console.log(error)
  }
},[])

const composeFunctions = (...funcs) => () => {
  funcs.forEach(func => func());
};

//search tags

const [searchTags, setSearchTags] = useState([]);


const handleTagClick = (tag) => {
console.log("tag",tag)
  if (searchTags.includes(tag)) {
    setSearchTags(searchTags.filter((t) => t !== tag));
   

  } else {
    setSearchTags([...searchTags, tag]);
  
  }
};
useEffect(() => {
  try {
    const params = new URLSearchParams({
      author:searchTags
    }).toString()
    axios.get(`http://localhost:4000/api2?${params}`)
      .then((response) => {
    // response.data.findOne({title:title}).then(()=>
    // setAPIData(response.data)
    // )
          setAPIData(response.data);
          
          console.log("APIDATA SET", APIData.map((x)=>x.source))
          console.log("tag getTag ",searchTags)


      })
  } catch (error) {
    console.log(error)
  }// eslint-disable-next-line
}, [searchTags])


const searchItems = (searchValue) => {
  try {
    setSearchInput(searchValue)
   
  if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return  Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        
       
      })
      setFilteredResults(filteredData)
      console.log("FilterDataResults",filteredResults)
  }
  else{
      setFilteredResults(APIData)
  }
  } catch (error) {
    console.log(error + "  srearch")
  }
  
}

const Arr = TagAPIData.map(x=>x.source.name)

const uniqueAPIData = Array.from(new Set(Arr)) 
const uniqueapidata = Array.from(new Set())

  return (
   <div >

<nav class="navbar navbar-expand-lg fixed-top " style={{backgroundColor:"#364F6B"}}>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">NEWSTV</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      {
      uniqueAPIData.map(source=>(
        <>
<span><Button  value={source} buttonText={source} key={source._id}  handleTagClick={handleTagClick}  /></span>

        </>
      ))
      
    }
       
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" onChange={(e) => searchItems(e.target.value)} aria-label="Search"/>
      </form>
    </div>
  </div>
</nav>


<div className='container backgroundGrad ' style={{ color:"#F5F5F5",minHeight:"150dvh",position:"relative" }}>
        {
        searchInput.length > 1 ? (
            filteredResults.map((item) => (
              <>
               <div className='d-md-flex' style={{backgroundColor:"black",padding:"10px",borderRadius:"10px"}}>
              <div>
                <img height={'150px'} src={item.urlToImage}/>
              </div>
                <div className='ms-4 mt-4 mt-sm-1'>
              <div key={item._id}>Title: {item.title}</div>
              <div >source: {item.source.name}</div>
              <div >Description: {item.description}</div>
              </div>
             
              
              </div>
              <hr></hr>
              <br></br>
              </>
            ))
        ) : (
          
            APIData.map((item) =>(
               <>
              <div className='d-md-flex  mb-4'style={{backgroundColor:"black",padding:"10px",borderRadius:"10px"}}>
              <div>
                <img height={'150px'} src={item.urlToImage}/>
              </div>
                <div className='ms-4 mt-1 mt-sm-4'>
              <div key={item._id}>Title: {item.title}</div>
              <div >source: {item.source.name}</div>
              <div >Description: {item.description}</div>
              </div>
             
              
              </div>
              <hr></hr>
              <br></br>
              </>
            ))
          
        )
        }
    </div>

</div>
)
}

export default News