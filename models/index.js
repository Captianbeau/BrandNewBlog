const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');


Post.hasMany(Comment,{
    foreignKey:'post_id',
    onDelete:'CASCADE',
});

//Didn't give Comment CASCADE so only one is deleted
Comment.belongsTo(Post,{
    foreignKey:'post_id',
});

User.hasMany(Post, {
    foreignKey:'user_id',
    onDelete:'CASCADE',
});
Post.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
})

User.hasMany(Comment, {
    foreignKey:'user_id',
    onDelete:'CASCADE',
});

Comment.belongsTo(User,{
    foreignKey:'user_id',
});

module.exports = {
    Post,
    Comment,
    User
}