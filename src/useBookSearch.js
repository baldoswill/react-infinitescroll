import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useBookSearch(query, pageNumber) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setBooks([]);
    }, [])
     
    useEffect(() => {
        setLoading(true);
        let cancel;
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...response.data.docs.map(b => b.title)])];
            })
            setHasMore(response.data.docs.length > 0);
            setLoading(false);
            console.log(response.data);
        }).catch(error => {
            console.log('canceilling')
            if(axios.isCancel(error)) return;
            setError(true);
        })
    }, [query, pageNumber])

    return  {loading, error, books, hasMore}
}
