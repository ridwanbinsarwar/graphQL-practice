const {UserList, MovieList} = require("../FakeData")
const _ = require("lodash");
const resolvers = {
    Query: {
        users(){
            return UserList
        },
        user: (parent,args) => {
            return _.find(UserList,{id: Number(args.id)})
        },

        // Movie Resolvers
        movies: ()=> {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(MovieList,{name})
            return movie
        }
    },
    User: {
        favoriteMovies: (parent,args) => {
            return _.filter(MovieList,(movie)=> movie.yearOfPublication > 2001)
        }
    },

    Mutation: {
        createUser: (parent,args) => {
            const user = args.input
            console.log(user);
            const lastId = UserList[UserList.length-1].id
            user.id = lastId + 1
            UserList.push(user)
            return user
        },

        updateUsername: (parent,args) => {
            const {id,newUsername} = args.input
            let updatedUser;
            UserList.forEach((user)=>{
                if(user.id==id) {
                    user.username = newUsername
                    updatedUser = user
                }
            })
            return updatedUser
        }
    }
    
}

module.exports = {resolvers}