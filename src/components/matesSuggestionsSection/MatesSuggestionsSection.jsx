import './MatesSuggestionSection.scss'
import photo from '../../pp.jpg';
import { useState } from 'react';
import MateSuggestion from './MateSuggestion';


const MatesSuggestionsSection = () => {

    let suggestions = [
        {   name: 'Salwa Kamel',
            friends: '4 mutual friends',
            image : photo    
        },
        {
            name: 'Salwa Kamel',
            friends: '4 mutual friends', 
            image : photo    
        },
        {
            name: 'Salwa Kamel',
            friends: '4 mutual friends', 
            image : photo    
        },
        {
            name: 'Salwa Kamel',
            friends: '4 mutual friends', 
            image : photo    
        },
    ];
    const [slicedSuggestions, setSlicedSuggestions] = useState(suggestions.slice(0,2));
    console.log(slicedSuggestions);
    const [seeMore, setSeeMore] = useState(false);
    const expandMatesSuggestions = function(){
        if(seeMore == true){
            setSeeMore(false);
            setSlicedSuggestions(suggestions.slice(0,2));
        }else{
            setSeeMore(true);
            setSlicedSuggestions(suggestions);
        }
    }

    return (
        <div className='component-layout' style={{ width: 23 + 'rem' }}>
            <h4 className='fw-bold ps-4 pt-3'>People you may Know:</h4>
            {slicedSuggestions.map((person,i)=>{
                return (
                <MateSuggestion key={i} name={person.name} friends={person.friends} image={person.image}></MateSuggestion>
            )}
                
            )}
            <div className="show-more-section">
                <p className='link text-center pt-3' onClick={expandMatesSuggestions}>{seeMore ? 'show less' : 'show more'}</p>
            </div>
        </div>
    )
}

export default MatesSuggestionsSection
