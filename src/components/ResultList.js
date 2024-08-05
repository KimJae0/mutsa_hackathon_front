// ResultList.js
import React from 'react';
import ResultItem from './ResultItem';

function ResultList({ searchResults, selectedTab }) {
  return (
    <div className="search-results">
      {searchResults.map((result, index) => (
        <ResultItem key={index} item={result} selectedTab={selectedTab} />
      ))}
    </div>
  );
}

export default ResultList;
