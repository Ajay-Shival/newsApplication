import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'


const News = () => {
const[getData,setData]= useState([])
const[getFilterData,setFilterData]= useState('') 
const[getAPIData,setAPIData]= useState([])


useEffect(()=>{
const newsData =async()=>{
try {
    const Data = await axios.get('http://localhost:4000/api')
    console.log("doneee")
  //  await console.log(Data.data.map((x)=>(x)))
   await setAPIData(Data.data)
  
} catch (err) {
    console.log("this is an "+err)
}
}
newsData()
},[])

const searchItems = (searchValue)=>{
 setFilterData(searchValue)
if(getFilterData !== ''){
  const filterData = getAPIData.filter((item)=>{
    return  Object.values(item).join('').toLowerCase().includes(getFilterData.toLowerCase())
  })

  setData(filterData)
}
else{
  setData(getAPIData)
}
}

  return (
    <div style={{ padding: 20 }}>
    {/* <Input icon='search'
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
    /> */}
  <form>
      <label>Enter your name:
        <input type="text" 
        onChange={(e) => searchItems(e.target.value)} />
      </label>
    </form>

    <div itemsPerRow={3} style={{ marginTop: 20 }}>
        {getFilterData.length > 1 ? (
            getData.map((item) => {
                return (
                    <div>
                        <div>
                            <h2 key={item._id}>{item.data.name}</h2>
                            <h4>
                                {item.data.description}
                            </h4>
                        </div>
                    </div>
                )
            })
        ) : (
            getAPIData.map((item) => {
                return (
                    <div>
                        <div>
                            <h2>{item.data.description}</h2>
                            <h4>
                                {item.data.name}
                            </h4>
                        </div>
                    </div>
                )
            })
        )}
    </div>
</div>
)
}

export default News