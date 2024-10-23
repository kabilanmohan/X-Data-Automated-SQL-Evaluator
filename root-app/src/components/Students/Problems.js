import NavigationBarStudent from '../NavBar/NavigationBarStudent';
import React, { useState, useEffect } from 'react';
import './Problems.css';

export default function StudentContests() {
  
  const blogPosts = [
      {
          title: 'SQL Master Challenge',
          description: 'Test your SQL skills in a series of complex queries and optimizations...',
          date: 'Jul 7, 2024',
          readTime: '5 min read',
      },
      {
          title: 'Database Design Wars',
          description: 'Compete in designing efficient SQL schemas and relationships...',
          date: 'Jun 24, 2024',
          readTime: '3 min read',
      },
      {
          title: 'Query Ninja Showdown',
          description: 'Showcase your prowess in crafting intricate SQL queries under time constraints...',
          date: 'Jun 24, 2024',
          readTime: '3 min read',
      },
      {
          title: 'SQL Optimization Olympics',
          description: 'Race against others to optimize SQL queries for performance...',
          date: 'Jul 7, 2024',
          readTime: '5 min read',
      },
      {
          title: 'Data Modeling Marathon',
          description: 'Demonstrate your ability to create robust SQL data models for varied scenarios...',
          date: 'Jul 7, 2024',
          readTime: '5 min read',
      },
      {
          title: 'Joins Jamboree',
          description: ' Battle it out in joining multiple tables effectively with SQL joins...',
          date: 'Jul 7, 2024',
          readTime: '5 min read',
      },
      {
          title: 'Stored Procedure Show',
          description: 'Compete in creating efficient and reusable SQL stored procedures...',
          date: 'Jul 7, 2024',
          readTime: '5 min read',
      },
      {
          title: 'SQL Security Smackdown',
          description: 'Test your skills in SQL backup and recovery strategies in simulated scenarios...',
          date: 'Jun 24, 2024',
          readTime: '3 min read',
      },
      {
          title: 'Backup & Recovery Rumble',
          description: 'The version updater component is a new feature that allows your app to check for updates...',
          date: 'Jun 24, 2024',
          readTime: '3 min read',
      }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(''); // Step 1: Add state for date filter
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
      setFilteredPosts(
        
          blogPosts.filter(post =>{
              const postDate = new Date(post.date);
              console.log("this is",postDate)
              const filterDate = dateFilter ? new Date(dateFilter) : null;
              console.log(filterDate)
              const matchesDate = filterDate ? 
    (new Date(postDate.setHours(0, 0, 0, 0)).getTime() === new Date(filterDate.setHours(0, 0, 0, 0)).getTime()) : 
    true;
              return (
              (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.description.toLowerCase().includes(searchQuery.toLowerCase()) )&&
              matchesDate
            );
  })  
      );
  }, [searchQuery,dateFilter]);
  
  return (
      <main className="content-problems">
          <NavigationBarStudent />
          <header className="blog-header-problems">
              <h1>Problems</h1>
              <p>Your journey to become a DBMS wizard starts here! </p>
              <div className="tabs-problems">
                  <span className="tab-problems active">Database</span>
                  <span className="tab-problems">Queries</span>
                  <span className="tab-problems">Joins</span>
                  <span className="tab-problems">Indexes</span>
                  <span className="tab-problems">Transactions</span>
                  <span className="tab-problems">Constraints</span>
                  <span className="tab-problems">Normalization</span>
                  <span className="tab-problems">Functions</span>
              </div>

              <div className="input-container-problems">
    <input
        type="text"
        className="search-bar-problems"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    <input
        type="date"
        className="date-filter-problems"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
    />
</div>
          </header>
          
          <section className="blog-section-problems">
              {filteredPosts.map((post, index) => (
                  <div key={index} className="blog-card-problems">
                      <div className="blog-card-header-problems">
                          <h2>{post.title}</h2>
                      </div>
                      <div className="blog-card-body-problems">
                          <p>{post.description}</p>
                      </div>
                      <div className="blog-card-footer-problems">
                          <span>{post.date}</span> &middot; <span>{post.readTime}</span>
                      </div>
                      <div className="blog-card-action-problems">
                          <button className="join-contest-button-problems">Submit Solution</button>
                      </div>
                  </div>
              ))}
              {filteredPosts.length === 0 && (
                  <p>No posts found matching your search criteria.</p>
              )}
          </section>
      </main>
  );
}