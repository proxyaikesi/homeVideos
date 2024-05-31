import mongoose from "mongoose";
import moment_tz from "moment-timezone"
import  {get, set} from "lodash";
const getDateFields = (schema: mongoose.Schema)=>{
    return   Object.keys(schema.paths).filter((x)=>{
        return schema.paths[x] instanceof mongoose.Schema.Types.Date
    })

}
module.exports = function (schema : mongoose.Schema,) {
    const paths = getDateFields(schema)
    const offset = moment_tz().utcOffset() * 60 * 1000;
    const fixOffset = (doc:mongoose.Document)=>{
        for(let path of paths){
            const date = get(doc,path);
            if(date){
               const fixedDate = date.valueOf() + offset;
               set(doc,path,new Date(fixedDate))
            }
        }
    }

    function addOffset(next:Function) {
        // @ts-ignore
        if (!this) return next();
        // @ts-ignore
        fixOffset(this);
        next();
    }

    function subtractOffset(docs:mongoose.Document, next:Function) {
        const documents = [];

        if (!docs) return next();

        if (!Array.isArray(docs)) {
            // @ts-ignore
            documents.push((docs.constructor.name === 'model') ? docs : this);
        } else {
            documents.push(...docs);
        }
        documents.forEach(result => fixOffset(result));
        next();
    }

    schema.pre('save', addOffset);
    schema.pre('findOneAndUpdate', addOffset);

    schema.post('save', subtractOffset);
    schema.post('find', subtractOffset);
    schema.post('findOne', subtractOffset);
    schema.post('findOneAndUpdate', subtractOffset);
}
