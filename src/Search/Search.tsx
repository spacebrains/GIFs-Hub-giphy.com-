import * as React from "react";

interface IProps {
    searchWithNewCondition: Function;
}

const Search: React.FC<IProps> = ({searchWithNewCondition}: IProps) => {
    let _condition: HTMLInputElement;

    const search = (e: React.SyntheticEvent) => {
        e.preventDefault();
        searchWithNewCondition(_condition.value);
    };
    const deleteCondition = () => {
        _condition.value = '';
        searchWithNewCondition('');
    };

    return (
        <div className='Search'>
            <form onSubmit={search} className='Search__form'>
                <input
                    ref={(input: HTMLInputElement) => _condition = input}
                    type="text"
                    placeholder='...'
                    required
                    className='Search__input'
                />
                <span onClick={deleteCondition} className='Search__span'>X</span>
                <button className='Search__button'>search</button>
            </form>

            <button>saves</button>
        </div>
    );
};

export default Search;