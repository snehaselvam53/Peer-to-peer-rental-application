import React, { useState } from 'react';

const ReviewPage = ({ rental }) => {
  const [currentUser, setCurrentUser] = useState('BORROWER');
  
  const [borrowerSubmitted, setBorrowerSubmitted] = useState(false);
  const [lenderSubmitted, setLenderSubmitted] = useState(false);

  const [borrowerReview, setBorrowerReview] = useState({ rating: '5', comment: '' });
  const [lenderReview, setLenderReview] = useState({ rating: '5', comment: '' });

  const handleBorrowerSubmit = (e) => {
    e.preventDefault();
    setBorrowerSubmitted(true);
  };

  const handleLenderSubmit = (e) => {
    e.preventDefault();
    setLenderSubmitted(true);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>⭐ Review & Rating</h2>

      <div style={{ ...styles.infoBox, marginBottom: '20px' }}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Item Status</span>
          <span style={{ 
            fontWeight: '600', 
            color: rental?.isAvailableAgain ? '#16a34a' : '#dc2626' 
          }}>
            {rental?.isAvailableAgain ? '● Available For Rent Again' : '● Marked Unavailable'}
          </span>
        </div>
      </div>

      <div style={styles.roleSwitch}>
        <span style={styles.switchLabel}>Testing View:</span>
        <div style={styles.btnGroup}>
          <button 
            style={currentUser === 'BORROWER' ? styles.activeSwitchBtn : styles.switchBtn} 
            onClick={() => setCurrentUser('BORROWER')}
          >
            Borrower
          </button>
          <button 
            style={currentUser === 'LENDER' ? styles.activeSwitchBtn : styles.switchBtn} 
            onClick={() => setCurrentUser('LENDER')}
          >
            Lender
          </button>
        </div>
      </div>

      {currentUser === 'BORROWER' && (
        <div>
          {borrowerSubmitted ? (
            <div style={styles.alertSuccess}>
              Thank you! Your review for {rental?.lenderName || 'Sneha'} has been submitted.
            </div>
          ) : (
            <form onSubmit={handleBorrowerSubmit} style={styles.form}>
              <h3 style={styles.formTitle}>Review Lender ({rental?.lenderName || 'Sneha'})</h3>
              
              <label style={styles.label}>Rating</label>
              <select 
                value={borrowerReview.rating} 
                onChange={(e) => setBorrowerReview({ ...borrowerReview, rating: e.target.value })}
                style={styles.select}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                <option value="4">⭐⭐⭐⭐ (4/5) Good</option>
                <option value="3">⭐⭐⭐ (3/5) Average</option>
                <option value="2">⭐⭐ (2/5) Poor</option>
                <option value="1">⭐ (1/5) Bad</option>
              </select>

              <label style={styles.label}>Comment</label>
              <textarea 
                rows="3" 
                value={borrowerReview.comment} 
                onChange={(e) => setBorrowerReview({ ...borrowerReview, comment: e.target.value })}
                placeholder="How was your experience with the lender?"
                style={styles.textarea}
                required
              />
              
              <button type="submit" style={styles.primaryBtn}>Submit Review</button>
            </form>
          )}
        </div>
      )}

      {currentUser === 'LENDER' && (
        <div>
          {lenderSubmitted ? (
            <div style={styles.alertSuccess}>
              Thank you! Your review for {rental?.borrowerName } has been submitted.
            </div>
          ) : (
            <form onSubmit={handleLenderSubmit} style={styles.form}>
              <h3 style={styles.formTitle}>Review Borrower ({rental?.borrowerName})</h3>
              
              <label style={styles.label}>Rating</label>
              <select 
                value={lenderReview.rating} 
                onChange={(e) => setLenderReview({ ...lenderReview, rating: e.target.value })}
                style={styles.select}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                <option value="4">⭐⭐⭐⭐ (4/5) Good</option>
                <option value="3">⭐⭐⭐ (3/5) Average</option>
                <option value="2">⭐⭐ (2/5) Poor</option>
                <option value="1">⭐ (1/5) Bad</option>
              </select>

              <label style={styles.label}>Comment</label>
              <textarea 
                rows="3" 
                value={lenderReview.comment} 
                onChange={(e) => setLenderReview({ ...lenderReview, comment: e.target.value })}
                placeholder="Was the item returned safely on time?"
                style={styles.textarea}
                required
              />
              
              <button type="submit" style={styles.primaryBtn}>Submit Review</button>
            </form>
          )}
        </div>
      )}

      {borrowerSubmitted && lenderSubmitted && (
        <div style={styles.alertCompleted}>
          Both parties completed their reviews! Rental order closed.
        </div>
      )}
    </div>
  );
};

export default ReviewPage;