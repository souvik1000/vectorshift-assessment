import { useState, useMemo } from 'react';

import Styles from "./tabs.module.scss";
import clsx from 'clsx';

/**
 * Generic Tabs component with optional search functionality.
 * 
 * @param {Array} tabs - Array of tab config objects: { label, content (array of items) }
 * @param {boolean} allowSearch - If true, show search input above tabs
 * @param {Function} renderItem - Function to render each item in the tab content
 * @param {string} searchPlaceholder - Placeholder text for search input (default: "Search...")
 */

export const Tabs = ({
  className,
  tabs = [],
  allowSearch = false,
  renderItem = (item) => item,
  searchPlaceholder = 'Search...',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const allItems = useMemo(() => {
    return tabs.flatMap((tab) => tab.content || []);
  }, [tabs]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null;

    return allItems.filter((item) => {
      const label = item.label?.toLowerCase() || '';
      const type = item.type?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return label.includes(query) || type.includes(query);
    });
  }, [searchQuery, allItems]);

  const clearSearch = () => setSearchQuery('');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const displayItems = filteredItems || tabs[activeTab]?.content || [];

  return (
    <div className={className}>
      <div className={clsx(Styles.tabWrapper, "margin-bottom-x3")}> 
        {allowSearch && (
          <div>
            <input
              type="text"
              value={searchQuery}
              className={Styles.tabSearchbar}
              placeholder={searchPlaceholder}
              onChange={handleSearchChange}
            />
          </div>
        )}

        <div className={Styles.tabContainer}>
          {tabs.map((tab, idx) => {
            const isActive = !searchQuery && activeTab === idx;

            return <button
              key={idx}
              className={Styles.tabs}
              onClick={() => setActiveTab(idx)}
              style={{
                color: isActive ? '#5865F2' : '#333',
                fontWeight: isActive ? 'bold' : 'normal',
                borderBottom: isActive ? '2px solid #5865F2' : 'none',
              }}
            >
              {tab.label}
            </button>
          })}
        </div>
      </div>
      
      <div className={clsx('gap-x3 d-flex-center', Styles.tabItemsWrapper)}>
        <div className={clsx('d-flex-center', Styles.tabSet)}>
          {displayItems.length > 0 ? (
            displayItems.map((item, idx) => (
              <div key={item.id || idx} className={Styles.tabItems}>{renderItem(item)}</div>
            ))
          ) : (
            <div className={Styles.noResult}>
              {searchQuery ? 'No results found' : 'No items available'}
            </div>
          )}
        </div>
        {searchQuery && (
          <div className={clsx('gap-x2 d-flex-center', Styles.searchCounter)}>
            <button
              className='button-red'
              onClick={clearSearch}
            >
              Clear
            </button>
            <span className={Styles.searchCounter}>Searching across all tabs... ({displayItems.length} results)</span>
          </div>
        )}
      </div>
    </div>
  );
};
