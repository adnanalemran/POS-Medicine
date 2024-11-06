import React from 'react';

const SearchBar = () => {
    return (
        <div>
            <form className="search-form">
                <div className="input-group">
                    <div className="input-group-text">
                        <i data-feather="search"/>
                    </div>
                    <input type="text" className="form-control" id="navbarForm" placeholder="Search here..."/>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;