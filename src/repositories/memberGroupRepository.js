import MemberGroups from "../models/memberGroupModel.js";
import { ServerError } from "../utils/serverError.js";

class MemberGroupRepository {
    static async getGroupsByMember (memberId) {
        const beGroupMember = await MemberGroups
            .find({user: memberId})
            .populate({
                    path: "group",
                    match: {active: true}
            })
        return beGroupMember
    }
    static async getMemberByIds(userId, groupId) {
        const memberGroup = await MemberGroups.find({user: userId, group: groupId})
        return memberGroup
    }
    static async joinMember(userId, groupId, role = 'reader') {
        const member = await MemberGroupRepository.getMemberByIds(userId, groupId)
        if (member.length > 0) {
            throw new ServerError(400, "el usuario ya pertenece al grupo de lectura")
        }
        const newMember = await MemberGroups.create({user: userId, group: groupId, role: role})
        return newMember
    }
    static async leaveMember(userId, groupId) {
        await MemberGroups.findOneAndDelete({user: userId, group: groupId})
        return true
    }
} 

export default MemberGroupRepository