import Users from "../models/userModel.js"

class usersRepository {
    static async createUser (name, mail, password) {
        const newUser = await Users.create({
            userName: name,
            mail: mail,
            password: password,
        })
        return newUser
    }
    static async addUserData(idUser, userSurname, age, profession, nationality) {
        const dataUser = {
            userSurname: userSurname,
            age: age,
            profession: profession,
            nationality: nationality
        }
        const addedData = await Users.findByIdAndUpdate(idUser, dataUser)
        return addedData
    }
    static async getByMail(mail) {
        const mailUserFind = await Users.findOne({mail: mail})
        return mailUserFind
    }
    static async getOneUser(idUser) {
        const oneUserFind = await Users.findById(idUser)
        return oneUserFind
    }  
    static async deleteUser (idUser) {
        await Users.findByIdAndDelete(idUser)
        return true
    }   
    static async updateUser (idUser, newValuesUser) {
        const updatedUser = await Users.findByIdAndUpdate(
            idUser,
            newValuesUser, 
            {
                new: true
            }
        )
        return updatedUser
    }
}

export default usersRepository