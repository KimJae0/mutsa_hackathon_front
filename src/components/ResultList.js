import React from 'react';

function ResultList({ searchResults, selectedTab }) {
    
    return (
        <div className="search-results">
            {searchResults.map((result) => (
                <div key={result.id} className="search-result">
                    
                    {selectedTab === '영양소' ? (
                        <div>
                            <h5>{result.foodNm}</h5>
                            <p>{`칼로리: ${result.enerc}, 탄수화물: ${result.chocdf}, 단백질: ${result.prot}, 지방: ${result.fatce}`}</p>
                        </div>
                    ) : (
                        <div>
                            <h5>{result.trName}</h5>
                            <p>{`유형: ${result.trType}, 무게: ${result.trWeight}`}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResultList;
