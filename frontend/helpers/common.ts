import {isPlainObject, isArray} from "lodash";

// export function generateFormData (data, {
//     // eslint-disable-next-line no-unused-vars
//     formData = new FormData(),
//     // eslint-disable-next-line no-unused-vars
//     insideKey = ""
// }:{formData?:FormData, insideKey?:string} = {}){
//     if (isPlainObject(data)){
//         Object.keys(data).forEach((key) => {
//             const value = data[key];
//             console.log(insideKey, "----inside key---------");
//
//             generateFormData(value, {
//                 formData,
//                 insideKey: insideKey ? `${insideKey}[${key}]` : key
//             });
//
//             console.log(value, "--------value---------");
//         });
//     }
//
//     return formData;
// }

export function generateFormData (data, {
    formData = new FormData(),
    insideKey = ""
}: { formData?: FormData, insideKey?: string } = {}){
    if (isPlainObject(data)){
        Object.keys(data).forEach((key) => {
            const value = data[key];

            generateFormData(value, {
                formData,
                insideKey: insideKey ? `${insideKey}[${key}]` : key
            });
        });
    } else if (isArray(data)){
        data.forEach((value, key) => {
            generateFormData(value, {
                formData,
                insideKey: insideKey ? `${insideKey}[${key}]` : String(key)
            });
        });
    } else {
        if (data !== null && data !== undefined){
            formData.append(insideKey, data);
        }
    }

    return formData;
}
