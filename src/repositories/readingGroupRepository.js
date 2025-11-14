import ReadingGroups from "../models/readingGroupModel.js"

class readingGroupRepository {
    static async createGroup (groupName, description) {
        const newGroup = await ReadingGroups.create({
            groupName: groupName,
            description: description
        })
        return newGroup
    }
    static async getAllGroups() {
        const allGroups = await ReadingGroups.find()
        return allGroups
    }
    static async getOneGroup(idGroup) {
        const oneGroupFind = await ReadingGroups.findById(idGroup)
        return oneGroupFind
    }  
    static async deleteGroup (idGroup) {
        await ReadingGroups.findByIdAndDelete(idGroup)
        return true
    }   
    static async updateGroup (idGroup, newValuesGroup) {
        const updatedGroup = await ReadingGroups.findByIdAndUpdate(
            idGroup,
            newValuesGroup, 
            {
                new: true
            }
        )
        return updatedGroup
    }
}

export default readingGroupRepository