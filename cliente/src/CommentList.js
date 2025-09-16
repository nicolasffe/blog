// cliente/src/CommentList.js
import React from 'react';
import axios from 'axios';

export default ({ comments, onAction, newCommentId }) => {

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`http://localhost:4001/comments/${commentId}`);
    onAction();
  };

  const handleLikeComment = async (commentId) => {
    await axios.post(`http://localhost:4001/comments/${commentId}/like`);
    onAction();
  };

  const renderedComments = comments.map((comment) => {
    const isNew = comment.id === newCommentId;
    const commentClass = `comment-item ${isNew ? 'comment-item-new' : ''}`;

    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = <em style={{ color: '#777' }}>Comentário aguardando moderação.</em>;
    } else if (comment.status === 'rejected') {
      content = <em style={{ color: '#D9534F' }}>Este comentário foi rejeitado.</em>;
    }

    return (
      <li key={comment.id} className={commentClass}>
        <div className="comment-content">{content}</div>
        
        {/* === BOTÕES REINSERIDOS AQUI === */}
        <div className='comment-actions'>
          <button onClick={() => handleLikeComment(comment.id)} className="btn-comment-action" title="Curtir">
            <span>❤️</span>
            <span>{comment.likes || 0}</span>
          </button>
          <button onClick={() => handleDeleteComment(comment.id)} className="btn-comment-action" title="Deletar">
            <span>🗑️</span>
          </button>
        </div>
      </li>
    );
  });

  return <ul className="list-unstyled mt-3">{renderedComments}</ul>;
};