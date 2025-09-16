// cliente/src/CommentList.js
import React from 'react';
import axios from 'axios';

export default ({ comments, onAction }) => {

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`http://localhost:4001/comments/${commentId}`);
    onAction();
  };

  const handleLikeComment = async (commentId) => {
    await axios.post(`http://localhost:4001/comments/${commentId}/like`);
    onAction();
  };

  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = <em className="text-muted">Comentário aguardando moderação.</em>;
    } else if (comment.status === 'rejected') {
      content = <em className="text-danger">Este comentário foi rejeitado.</em>;
    }

    return (
        <li key={comment.id} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
            <div>{content}</div>
            <div className='d-flex align-items-center'>
                 <button onClick={() => handleLikeComment(comment.id)} className="btn btn-sm btn-light me-2" title="Curtir">
                    ❤️ {comment.likes || 0}
                 </button>
                 <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-sm btn-light" title="Deletar">
                    🗑️
                 </button>
            </div>
        </li>
    );
  });

  return <ul className="list-unstyled mt-3">{renderedComments}</ul>;
};