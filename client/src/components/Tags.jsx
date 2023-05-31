import React from 'react'

import axios from 'axios'
import { useState,useEffect } from 'react'

const Tags = () => {

    const [APIData, setAPIData] = useState([])
    // const [filteredResults, setFilteredResults] = useState([]);
    const [getTags, setTags] = useState([]);
    useEffect(() => {
        try {
            const params =new URLSearchParams({
                author: getTags
            }).toString()
            console.log(params," =params")
          axios.get(`http://localhost:4000/api`)
            .then((response) => {
                setAPIData(response.data)
                console.log("axios tags ")
                console.log(APIData.map((x)=>x.source))
            })
        } catch (error) {
          console.log(error)
        }// eslint-disable-next-line
      }, [getTags])



const Arr = APIData.map(x=>x.source.name)

const uniqueAPIData = Array.from(new Set(Arr)) 
console.log('ggg',uniqueAPIData)

function TagButton(e){
  this.props.navigation.navigate('News', { })
  setTags(getTags.concat(",",e.target.value))
}

  return (
   <>
   <div>
    {
      uniqueAPIData.map(source=>(
        <>
       
        <span><button value={source} key={source._id}  onClick={(e)=>{TagButton(e)}}  >{source}</button></span>
        
        </>
      ))
      
    }
    <button>EMPTY</button>
   <div>{getTags}</div>

  </div>
   

   </>

  )
}

export default Tags