const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const Subscription = {
    // Define your subscription resolver here
    createUser: {
        subscribe: (parent, args, { db }, info)=> {
            console.log('subs')
            console.log(args.createUser)
            return pubsub.asyncIterator('userCreated');
        },
        resolve: (payload) => {
            console.log(payload)
            console.log('res')
            return payload.createUser;
        }
    },
};

module.exports = Subscription;
