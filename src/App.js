import useBookSearch from './useBookSearch';
import React, {useEffect, useState, useRef, useCallback} from 'react';

function App() {
 
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [isFirstTime, setFirstTime] = useState(true);

	const {books, hasMore, loading, error} = useBookSearch(query, pageNumber)

	const observer = useRef();
	const lastBookElementRef = useCallback(node => {
		if(loading) return
		if(observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting && hasMore){
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		});

		if(node) observer.current.observe(node)

	}, [loading, hasMore])

	const handleSearch = e => {
		console.log(e.target.value)
		setQuery(e.target.value);
		setPageNumber(1)
	}

	 

 
	return (
		<div className="App" >
			<input type="text" onChange = {handleSearch} value = {query}/>
			{books.map((book, index) => {
				if(books.length === index + 1){
					return <div key = {book} ref = {lastBookElementRef}>{book}</div>
				}else{
					return <div key = {book} >{book}</div>
				}				
			})}
			<h3>{loading && '...Loading...'}</h3>
			<h3>{error && '...Error...'}</h3>
		</div>
	);
}

export default App;
