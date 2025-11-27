import readingGroupRepository from "../repositories/readingGroupRepository.js";
import MemberGroupRepository from "../repositories/memberGroupRepository.js";
import {ServerError} from "../utils/serverError.js";
import {checkID} from "../utils/checkID.js";

class groupController {
    static async getAllGroups(req, res) {
        try {
            const groups = await readingGroupRepository.getAllGroups();
            if (groups.length === 0) {
                return res.json({
                    ok: true,
                    status: 200,
                    message: "no hay grupos disponibles por el momento, crea uno!",
                    data: {
                        groups: []
                    }
                });
            }
            res.json({
                ok: true,
                status: 200,
                message: "grupos cargados con exito",
                data: {
                    groups: groups
                }
            });
        } catch (error) {
            if (error.status) {
                return res.json({
                    ok: false,
                    status: error.status,
                    message: error.message
                });
            } else {
                return res.json({
                    ok: false,
                    status: 500,
                    message: "error interno del servidor"
                });
            }
        }
    }
    static async getGroupById(req, res) {
        try {
            const groupID = req.params.groupId            
            if (!checkID(groupID)) {
                throw new ServerError(400, "el ID de grupo recibido por parametro no es un ID valido")
            }
            const group = await readingGroupRepository.getOneGroup(groupID)
            if (!group) {
                throw new ServerError(404, "grupo no encontrado")
            }
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "grupo encontrado",
                    data: {
                        group: group
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
    static async createGroup(req, res) {
        try {
            const userID = req.user.id
            const { groupName, description } = req.body
            if (!groupName) {
                throw new ServerError(400, "debes ingresar un nombre para el grupo")
            } else if (groupName.length < 3 || groupName.length > 30) {
                throw new ServerError(400, "el nombre del grupo debe tener entre 3 y 30 caracteres")
            }
            if (!description) {
                throw new ServerError(400, "debes ingresar una descripcion para el grupo")
            } else if (description.length < 10 || description.length > 150) {
                throw new ServerError(400, "la descripcion debe tener entre 10 y 150 caracteres")
            }
            const newGroup = await readingGroupRepository.createGroup(groupName, description)
            await MemberGroupRepository.joinMember(userID, newGroup._id, "super reader")
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "grupo creado con exito",
                    data: {
                        group: newGroup
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
    static async joinGroup(req, res) {
        try {
            const userID = req.user.id
            const {groupId} = req.params
            if (!checkID(groupId)) {
                throw new ServerError(400, "el ID de grupo recibido por parametro no es un ID valido")
            }
            const group = await readingGroupRepository.getOneGroup(groupId)
            if (!group) {
                throw new ServerError(404, "grupo no encontrado")
            }
            if (!group.active) {
                throw new ServerError(400, "el grupo no esta activo")
            }
            await MemberGroupRepository.joinMember(userID, groupId)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "te uniste al grupo con exito"
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
    static async getMyGroups(req, res) {
        try {
            const userID = req.user.id
            const myGroups = await MemberGroupRepository.getGroupsByMember(userID)
            if (!myGroups || myGroups.length === 0) {
                throw new ServerError(200, "no perteneces a ningun grupo aun, unete a uno!")
            }
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "tus grupos se cargaron con exito",
                    data: {
                        groups: myGroups
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
    static async leaveGroup(req, res) {
        try {
            const userID = req.user.id
            const {groupId} = req.params
            if (!checkID(groupId)) {
                throw new ServerError(400, "el ID de grupo recibido por parametro no es un ID valido")
            }
            await MemberGroupRepository.leaveMember(userID, groupId)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "saliste del grupo con exito"
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

export default groupController