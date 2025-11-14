import usersRepository from "../repositories/userRepository.js";
import { checkID } from "../utils/checkID.js";
import { ServerError } from "../utils/serverError.js";

class userController {
    static async getUserProfile(req, res) {
        try {
            const userID = req.user.id
            const user = await usersRepository.getOneUser(userID)
            if (!user) {
                throw new ServerError(404, "usuario no encontrado")
            }
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "perfil obtenido correctamente",
                    data: {
                        user: user
                    }
                }
            )
        }
        catch(error) {
            if(error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok: false,
                        status: 500,
                        message: "error interno del servidor"
                    }
                )
            }
        }
    }

    static async updateMyProfile(req, res) {
        try {
            const userID = req.user.id
            const {userName, userSurname, age, profession, nationality} = req.body
            const updateData = {}
            if(!userName){
                updateData.userName = req.user.name  
            } else if (userName.length < 2) {
                throw new ServerError(400, "el nombre debe tener al menos 2 caracteres")
            } else {
                updateData.userName = userName
            }
            if(!userSurname){
                updateData.userSurname = req.user.surname  
            } else {
                updateData.userSurname = userSurname  
            }
            if(!age){
                updateData.age = req.user.age
            } else if(age < 13 || age > 100) {
                throw new ServerError(400, "la edad debe estar entre 13 y 100 años")
            } else {
                updateData.age = age  
            }
            if(!profession) {
                updateData.profession = req.user.profession
            } else {
                updateData.profession = profession  
            }
            if(!nationality) {
                updateData.nationality = req.user.nationality
            } else {
                updateData.nationality = nationality  // ← Agregar cuando SÍ viene
            }
            const updatedUser = await usersRepository.updateUser(userID, updateData)
            if (!updatedUser) {
                throw new ServerError(404, "usuario no encontrado")
            }
            res.json({
                ok: true,
                status: 200,
                message: "perfil actualizado correctamente",
                data: {
                    user: updatedUser
                }
            })
        }
        catch(error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok: false,
                        status: 500,
                        message: "error interno del servidor"
                    }
                )
            }
        }
    }

    static async deleteUser(req, res) {
        try {
            const userID = req.user.id
            const user = await usersRepository.getOneUser(userID)
            if (!user) {
                throw new ServerError(404, "usuario no encontrado")
            }
            await usersRepository.deleteUser(userID)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "cuenta eliminada correctamente"
                }
            )
        }
        catch(error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok: false,
                        status: 500,
                        message: "error interno del servidor"
                    }
                )
            }
        }
    }

    static async getUserById(req, res) {
        try {
            const userID = req.params.userId
            if (!checkID(userID)){
                throw new ServerError(400, "el ID de usuario recibido por parametro no es un ID valido")
            }
            const user = await usersRepository.getOneUser(userID)
            if(!user) {
                throw new ServerError(404, "usuario no encontrado")
            }
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "usuario encontrado",
                    data: {
                        user: user
                    }
                }
            )
        }
        catch(error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok: false,
                        status: 500,
                        message: "error interno del servidor"
                    }
                )
            }
        }
    }
}

export default userController