import { v4 as uuidv4 } from 'uuid';
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Mutation = {
    createUser(parent, args, {db}, info) {
        
        const emailTaken = db.users.some((user) => user.email === args.data.email);

        if(!emailTaken) {
            const user = {
                id: uuidv4(),
                ...args.data
            }
            db.users.push(user);
            pubsub.publish('userCreated', { createUser: user,payload:args.data })
            return user;
        }else{
            throw new Error('Email taken');
        }
    },
    createPost(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.post.author);
        if(userExists) {
            const post = {
                id: uuidv4(),
                ...args.post,
                
            }
            db.posts.push(post);
            return post;
        }else{
            throw new Error('User not found');
        }

    },
    createComment(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.comment.author);
        const postExists = db.posts.some((post) => post.id === args.comment.post );
        if(userExists && postExists) {
            const comment = {
                id: uuidv4(),
                ...args.comment,
            }
            db.comments.push(comment);
            return comment;
        }else{
            throw new Error('User or post not found');
        }
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id);
        if(userIndex === -1) {
            throw new Error('User not found');
        }
        const deletedUsers = db.users.splice(userIndex, 1);
        db.posts = posts.filter((post) => {
            const match = post.author === args.id;
            if(match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id);
            }
            return !match;
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id);
        return deletedUsers[0];
    },
    deletePost(parent, args, {db}, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id);
        if(postIndex === -1) {
            throw new Error('Post not found');
        }
        const deletedPosts = db.posts.splice(postIndex, 1);
        db.comments = db.comments.filter((comment) => comment.post !== args.id);
        const author = db.users.findIndex((user)=>user.id===deletedPosts[0].author);
        db.users[author].posts = db.users[author].posts.filter((post)=>post!==args.id);
        
        return deletedPosts[0];
    },
    deleteComment(parent, args, {db}, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);
        if(commentIndex === -1) {
            throw new Error('Comment not found');
        }
        const deletedComments = db.comments.splice(commentIndex, 1);
        const author = db.users.findIndex((user)=>user.id===deletedComments[0].author);
        db.users[author].comments = db.users[author].comments.filter((comment)=>comment!==args.id);
        const post = db.posts.findIndex((post)=>post.id===deletedComments[0].post);
        db.posts[post].comments = db.posts[post].comments.filter((comment)=>comment!==args.id);
        return deletedComments[0];
    },
    updateUser(parent, args, {db}, info) {
        const user = db.users.find((user) => user.id === args.id);
        if(!user) {
            throw new Error('User not found');
        }
        if(typeof args.data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === args.data.email);
            if(emailTaken) {
                throw new Error('Email taken');
            }
            user.email = args.data.email;
        }
        if(typeof args.data.name === 'string') {
            user.name = args.data.name;
        }
        if(typeof args.data.age !== 'undefined') {
            user.age = args.data.age;
        }
        return user;
    },
    updatePost(parent, args, {db}, info) {
        const post = db.posts.find((post) => post.id === args.id);
       
        if(!post) {
            throw new Error('Post not found');
        }
        if(typeof args.data.title === 'string') {
            post.title = args.data.title;
        }
        if(typeof args.data.body === 'string') {
            post.body = args.data.body;
        }
        if(typeof args.data.published !== 'boolean') {
            post.published = args.data.published;
        }
        return post;
    },
    updateComment(parent, args, {db}, info) {
        const comment = db.comments.find((comment) => comment.id === args.id);
        if(!comment) {
            throw new Error('Comment not found');
        }
        if(typeof args.data.text === 'string') {
            comment.text = args.data.text;
        }
        return comment;
    }
}

export {Mutation as default}