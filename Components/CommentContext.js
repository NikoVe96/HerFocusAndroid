// import React, {createContext, useContext, useState} from 'react';

// const CommentsContext = createContext();

// export const useComments = () => useContext(CommentsContext);

// export const CommentsProvider = ({children}) => {
//   const [comments, setComments] = useState([]);

//   const fetchComments = async postObject => {
//     let query = new Parse.Query('Comment');
//     query.equalTo('postIdentifier', postObject);
//     query.descending('createdAt');
//     const results = await query.find();
//     setComments(results);
//   };

//   useEffect(() => {
//     async function getCurrentUser() {
//       const currentUser = await Parse.User.currentAsync();
//       setUsername(currentUser.getUsername());
//       setAvatar(currentUser.get('avatar'));
//     }
//     getCurrentUser();
//   }, []);

//   const showModal = commentId => {
//     setCurrentCommentId(commentId);
//     setModalVisible(true);
//   };

//   const hideModal = () => {
//     setModalVisible(false);
//   };

//   async function deleteComment(commentId) {
//     console.log('commentID: ' + commentId);
//     let query = new Parse.Query('Comment');
//     query.equalTo('objectId', commentId);
//     const result = await query.first();
//     console.log('result: ' + result);
//     try {
//       await result.destroy();
//       updatePostCommentCount();
//       handleDeleteComment(commentId);
//     } catch (error) {
//       console.error('Failed to delete the comment:', error);
//     }
//     hideModal();
//   }

//   async function updatePostCommentCount() {
//     const postQuery = new Parse.Query('Post'); 
//     const post = await postQuery.get(postId);
//     post.increment('numberOfComments', -1);
//     await post.save();
//   }

//   const handleDeleteComment = commentId => {
//     const updatedComments = comments.filter(
//       comment => comment.id !== commentId,
//     );
//     setComments(updatedComments);
//   };

//   return (
//     <CommentsContext.Provider value={{comments, connentId, showModal, hideModal, fetchComments, deleteComment}}>
//       {children}
//     </CommentsContext.Provider>
//   );
// };
