const mongoose = require("mongoose");
const { DateMixin } = require("@dpapplications/commons-nodejs");

class BaseRepository {

    constructor(modelClass) {
        this.modelClass = modelClass;
    }

    /**
     * 
     * @param {*} dataModel 
     * @param {MongoSession} mongoSession instância de MongoSession
     */
    async $save(dataModel, mongoSession = {}) {
        const currentDate = this.newDate();
       
        if(dataModel._id) {
            dataModel.lastUpdateDate = currentDate;
        }
        const savedModel = await  (new this.modelClass(dataModel)).save({session: mongoSession.session});
        return savedModel;
    }

    /**
     * 
     * @param {Array} itemsModel Array [] 
     * @param {MongoSession} mongoSession instância de MongoSession
     */
    async $insertMany(itemsModel, mongoSession = {}) {
        itemsModel.forEach(item => {
            item.lastUpdateDate = this.newDate();
        })
        const savedModels = await this.modelClass.insertMany(itemsModel, {session: mongoSession.session});
        return savedModels;
    }

    /**
     * 
     * @param {*} dataModel 
     * @param {MongoSession} mongoSession instância de MongoSession
     */
    async $update(dataModel, mongoSession = {}) {
        dataModel.lastUpdateDate = this.newDate();
        const savedModel = await dataModel.save({session: mongoSession.session});
        return savedModel;
    }
    
    async $listAggregate(aggregationPipeline, mongoSession = {}) {
        if(mongoSession !== undefined
            && mongoSession.session !== undefined) {
            return await this.modelClass.aggregate(aggregationPipeline).session(mongoSession.session).exec();
        }  
        return await this.modelClass.aggregate(aggregationPipeline).exec();
    }

    /**
     * 
     * @param {ObjectId|String} id Parâmetro que representa um _id do Mongo. Pode ser uma String ou um ObjectID do próprio Mongo.
     */
    async $getById(id, active = true) {
        let finalIdFormat = id;
        if(typeof id === "string") {
            finalIdFormat = mongoose.Types.ObjectId(id);
        }
        const query = {
            _id: finalIdFormat,
        }
        if (active) {
            query['active'] = true
        }  

        const recordModel = await this.modelClass.findOne(query);

        return recordModel;
    }

    async $list(query, {lean = false} = {}) {
        const recordModel = await this.modelClass.find(query).lean(lean);
        return recordModel;
    }

    async $findOne(query, mongoSession = {}) {
        if(mongoSession !== undefined
            || mongoSession.session !== undefined) {
            return await this.modelClass.findOne(query).session(mongoSession.session);
        }
        return await this.modelClass.findOne(query);
    }

    async $deleteOne(query, mongoSession = {}) {
        if(mongoSession !== undefined
            || mongoSession.session !== undefined) {
            return await this.modelClass.deleteOne(query).session(mongoSession.session);
        }
        return await this.modelClass.deleteOne(query);
    }

}

async function createModel(modelClass, instance) {
    return new modelClass(instance)
}

DateMixin.assignAll(BaseRepository);

module.exports = BaseRepository;