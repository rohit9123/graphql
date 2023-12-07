
const Subscription = {
    // Define your subscription resolver here
    createUser: {
        subscribe: (parent, args, { db,pubsub }, info)=> {
            console.log('subs')
            console.log(args.createUser)
            return pubsub.asyncIterator('userCreated');
        },
    },
    createPost: {
        subscribe: (parent, args, { db,pubsub }, info)=> {
            console.log('subs')
            return pubsub.asyncIterator('postCreated');
        },

    }
};

module.exports = Subscription;
