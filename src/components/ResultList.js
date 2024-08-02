import React from 'react';

function ResultList({ searchResults, selectedTab }) {
    return (
        <div className="search-results">
            {searchResults.map((result) => (
                <div key={result.id} className="search-result">
                    <h5>{result.name}</h5>
                    {selectedTab === '영양소' ? (
                    <p>{`칼로리: ${result.calories}, 탄수화물: ${result.carbs}, 단백질: ${result.protein}, 지방: ${result.fat}`}</p>
                    ) : (
                    <p>{`유형: ${result.type}, 무게: ${result.weight}`}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResultList;
