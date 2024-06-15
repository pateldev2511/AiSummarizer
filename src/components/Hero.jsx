import {logo} from '../assets'


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt="sumz_logo" className='w-[120px] object-contain' />

            <button type='button' onClick={() => window.open('https://github.com/pateldev2511')} className='black_btn'>
                GitHub
            </button>
        </nav>

        <h1 className='head_text'>
            Summarize Articles with <br className='max-md:hidden' /> <span className='blue_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'>
        Effortlessly summarize articles using OpenAI GPT-4. Just enter the website link, and get concise, accurate summaries in seconds. Perfect for quick insights and efficient reading.
        </h2>
    </header>
  )
}

export default Hero