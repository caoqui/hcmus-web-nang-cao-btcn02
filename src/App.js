import './App.css';
import {useEffect, useLayoutEffect, useState} from "react"
import axios from "axios"


function App() {

  const [searchValue, setSearchValue] = useState()
  const [memes, setMemes] = useState([])
  const [findMeme, setFindMeme] = useState()
  const [limitImage, setLimitImage] = useState(20)
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(false)



  function handleScroll() {
    setScrollY(window.scrollY);
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
     // Sử dụng hàm isPageScrolledToBottom() để kiểm tra
     if (isPageScrolledToBottom()) {
      setLimitImage(prevState => prevState + 20)
      setIsLoading(true)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY])

  useLayoutEffect(() => {
    const apiKey = 'bENabdBFxeUtyxExuXhqS7wDz7BqUZE3'; // Thay YOUR_API_KEY bằng API Key của bạn

    axios.get(`https://api.giphy.com/v1/gifs/search?q=${findMeme}&api_key=${apiKey}&limit=${limitImage}`)
      .then((response) => {
        setMemes(response.data.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching memes: ', error);
      });

  }, [findMeme, limitImage]);

 
  

  function handleSearch() {
    setFindMeme(searchValue);
    setLimitImage(20);
  }

  function Memes() {
    return (
      <div>
        {memes.map(meme => (
          <img className='memes' 
          src={meme.images.downsized.url} 
          key={meme.id}
          alt={meme.images.downsized.url} 
          style={{ width: '400px', height: 'auto' }}
          />
          
        ))}

      </div>
    );
  }


  function Loading() {
    return (
      <div>
        <img 
        src='https://media1.giphy.com/media/q15kbCtGFqwx8wYx1n/giphy.gif?cid=ecf05e47rk9mzdya7j9s5g55p2gobympdavqexo0czb0wnt1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        alt='loading'
        />
      </div>
    );
  }


  function isPageScrolledToBottom() {
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const currentScrollPosition = window.scrollY;
    
    // Kiểm tra xem hiện tại đã cuộn đến đáy hay chưa
    return windowHeight + currentScrollPosition >= documentHeight;
  }


  
  return (
    <div className="App">
     <input id="search-meme"
      placeholder='Search meme...' 
      onChange={e => setSearchValue(e.target.value)}
      />
     <button onClick={handleSearch}>Search</button>
     <Memes/>
      {isLoading&&<Loading/>}
    </div>
  );
}

export default App;
