import { createContext } from 'react';
import filter from 'leo-profanity';

export const FilterContext = createContext(null);

const FilterProfanityProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));
  return (<FilterContext.Provider value={filter}>{children}</FilterContext.Provider>);
};

export default FilterProfanityProvider;
