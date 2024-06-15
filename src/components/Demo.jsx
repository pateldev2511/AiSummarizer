import { useState, useEffect } from 'react'

import {copy, linkIcon, loader, tick, search} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {

  const [article , setArticle] = useState({
    url:'',
    summary:'',
  })

const [allArticles, setAllArticles] = useState([])
const [copied, setCopied] = useState("")

const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()

useEffect(() => {
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

  if(articlesFromLocalStorage){
    setAllArticles(articlesFromLocalStorage)
  }
},[])

const handleCopy =(copyurl) =>{

  setCopied(copyurl)
  navigator.clipboard.writeText(copyurl)
  setTimeout(() => {
    setCopied(false)
  }, 3000)
}
  const handleSubmit = async(e) => {
    e.preventDefault()
    const { data } = await getSummary({articleUrl: article.url})

    if(data?.summary){
      const newArticle = {...article, summary: data.summary}
      const updatedArticles = [newArticle, ...allArticles]
      
      setAllArticles(updatedArticles)
      setArticle(newArticle)

      localStorage.setItem('articles', JSON.stringify(updatedArticles))

      console.log(newArticle)
    }
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* {search} */}
    <div className='flex flex-col w-full gap-2'>
      <form className='relative flex justify-center items-center'
      onSubmit={handleSubmit}
      >
        <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5' />

        <input type="url"
        placeholder='Enter the URL of the article'
        value={article.url}
        onChange={(e) => setArticle({...article, url:e.target.value})}
        required
        className='url_input peer'
        />

        <button
        type='submit'
        className='submit_btn'
        >
        <img src={search} alt="link_icon" className='absolute items-center w-5' />
          
        </button>
      </form>
      {/* { Browse URL History } */}
      <div
      className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {allArticles.map((item, index) =>(
        <div key={index}
        onClick={() => {
          setArticle(item)}}
        className='link_card'
        >
          <p
           className='flex font-poppins text-blue-500 text-sm truncate font-medium'
          >{item.url}</p>
          <div
          type='button'
          onClick={() => {
            setArticle(item)
          }}
          >
            <div
            className='copy_btn'
            onClick={()=> handleCopy(item.url)}
            >
              <img src={copied == item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain place-items-end' />

            </div>
          </div>
        </div>
      ))}
        </div>      
    </div>

    {/* { Display Result } */}
    <div
    className='my-10 max-w-full flex flex-justify-center items-center'
    >
      {isFetching ? 
      <img src={loader} alt="loader" className='w-20 h-20 object-contain' /> 
      : error ? (
        <p className='text-red-500 font-poppins text-lg'>An error occurred. Please try again later <br /> 
        <span
        className='font-poppins font-normal text-sm text-gray-700'
        >{error?.data?.error}</span></p>
      ) : (
        article.summary && (
          <div
          className='flex flex-col gap-3'
          >
            <h2
            className='font-poppins text-xl font-bold text-gray-600 text-center'
            >
              Article <span className='blue_gradient'>Summary</span>
            </h2>
            <div 
            className='summary_box'
            >
              <p
              className='font-inter text-sm font-medium text-gray-700'
              >{article.summary}</p>
            </div>
          </div>
        )
      )}
    </div>
    </section>
  )
}

export default Demo