import MemberGroupRepository from "../repositories/memberGroupRepository.js";
import { ServerError } from "../utils/serverError.js";
import { checkID } from "../utils/checkID.js";

const membershipMiddleware = async (req, res, next) => {
    try {
        const userID = req.user.id 
        const groupID = req.params.groupId 
        if (!checkID(groupID)) {
            throw new ServerError(400, "el ID del grupo no es un ID valido")
        }
        const membershipCheck = await MemberGroupRepository.getMemberByIds(userID, groupID)
        const membership = membershipCheck[0]
        if (!membership) {
            throw new ServerError(403, "no perteneces a este grupo")
        }
        const membershipData = {
            role: membership.role,
            joinedAt: membership.unitedAt,
            groupId: groupID,
            userId: userID
        }
        req.membership = membershipData
        next() 
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
                    message: "error interno del servidor en verificacion de membresia"
                }
            )
        }
    }
}

export default membershipMiddleware