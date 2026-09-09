import React, { useState } from 'react';

  const ReturnPage = ({ rental, onReturnComplete, onCancelPending }) => {
  const [status, setStatus] = useState(rental?.status || 'BORROWED');
  const [currentUser, setCurrentUser] = useState('BORROWER');

  const handleBorrowerConfirm = () => {
    setStatus('RETURN_REQUESTED');
  };

  const handleLenderReceived = (isReceived) => {
    if (isReceived) {
      setStatus('LENDER_RECEIVED');
    } else {
      setStatus('RETURN_PENDING');
      if (onCancelPending) onCancelPending();
    }
  };

  const handleLendAgainChoice = (canLendAgain) => {
    if (onReturnComplete) {
      onReturnComplete({
        ...rental,
        status: 'RETURNED',
        isAvailableAgain: canLendAgain
      });
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}> Return Item</h2>

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

      <div style={styles.infoBox}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Item Name</span>
          <span style={styles.infoValue}>{rental?.itemName}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Borrower</span>
          <span style={styles.infoValue}>{rental?.borrowerName}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Lender</span>
          <span style={styles.infoValue}>{rental?.lenderName}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Status</span>
          <span style={styles.badge}>{status}</span>
        </div>
      </div>

      {currentUser === 'BORROWER' && (
        <div style={styles.section}>
          {status === 'BORROWED' && (
            <div>
              <p style={styles.sectionText}>Are you ready to confirm that you've returned this item to the lender?</p>
              <button style={styles.primaryBtn} onClick={handleBorrowerConfirm}>
                Confirm Return
              </button>
            </div>
          )}

          {status === 'RETURN_REQUESTED' && (
            <div style={styles.alertRequested}>
              Waiting for Lender to confirm item receipt...
            </div>
          )}

          {status === 'RETURN_PENDING' && (
            <div style={styles.alertPending}>
              Lender marked item as Not Received. Please contact lender directly.
            </div>
          )}
        </div>
      )}

      {currentUser === 'LENDER' && (
        <div style={styles.section}>
          {status === 'BORROWED' && (
            <p style={styles.sectionText}>Borrower has not initiated the return process yet.</p>
          )}

          {status === 'RETURN_REQUESTED' && (
            <div>
              <h4 style={styles.actionTitle}>Did you receive the item?</h4>
              <div style={styles.buttonRow}>
                <button style={styles.successBtn} onClick={() => handleLenderReceived(true)}>
                  Yes, Received
                </button>
                <button style={styles.dangerBtn} onClick={() => handleLenderReceived(false)}>
                  No, Missing
                </button>
              </div>
            </div>
          )}

          {status === 'RETURN_PENDING' && (
            <div style={styles.alertPending}>
               Marked as Not Received. Status: Return Pending.
            </div>
          )}

          {status === 'LENDER_RECEIVED' && (
            <div>
              <h4 style={styles.actionTitle}>Do you want to lend this item out again?</h4>
              <div style={styles.buttonRow}>
                <button style={styles.primaryBtn} onClick={() => handleLendAgainChoice(true)}>
                  Yes (Make Available)
                </button>
                <button style={styles.secondaryBtn} onClick={() => handleLendAgainChoice(false)}>
                  No (Make Unavailable)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReturnPage;