import React, {useState } from 'react';
import css from "./Searchbar.module.css"

export const Searchbar =({onSubmit})=> {
    
    const [search,setSearch] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        if(search===""){
            alert("Введіть текст")
            return
        }
        onSubmit(search)
        setSearch("")
        
    }

    const handleChange = (event) => {
        setSearch(event.target.value.toLowerCase())
       
    }

   
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchForm__button}>
                        <span className={css.SearchForm_button_label}>Search</span>
                    </button>
                    <input
                        name="searchInput"
                        className={css.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={search}
                        onChange={handleChange}
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    
}
