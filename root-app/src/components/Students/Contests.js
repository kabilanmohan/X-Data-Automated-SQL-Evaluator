import NavigationBarStudent from '../NavBar/NavigationBarStudent';
import React, { useState, useEffect } from 'react';
import './Contests.css';

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
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
      setFilteredPosts(
          blogPosts.filter(post =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
  }, [searchQuery]);

  return (
      <main className="content">
          <NavigationBarStudent />
          <header className="blog-header">
              <h1>Contests</h1>
              <p>Contest every week. Complete and see your ranking!</p>
              <div className="tabs">
                  <span className="tab active">Database</span>
                  <span className="tab">Queries</span>
                  <span className="tab">Joins</span>
                  <span className="tab">Indexes</span>
                  <span className="tab">Transactions</span>
                  <span className="tab">Constraints</span>
                  <span className="tab">Normalization</span>
                  <span className="tab">Functions</span>
              </div>
              <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
          </header>
          <section className="blog-section">
              {filteredPosts.map((post, index) => (
                  <div key={index} className="blog-card">
                      <div className="blog-card-header">
                          <h2>{post.title}</h2>
                      </div>
                      <div className="blog-card-body">
                          <p>{post.description}</p>
                      </div>
                      <div className="blog-card-footer">
                          <span>{post.date}</span> &middot; <span>{post.readTime}</span>
                      </div>
                      <div className="blog-card-action">
                          <button className="join-contest-button">Join Contest</button>
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